# define the provider info
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)
  project = var.project_gcp
  region  = var.region_gcp
  zone    = var.zone_gcp
}

# create the compute engine instance
resource "google_compute_instance" "apps" {
  count        = 1
  name         = "designmatch-apps-${count.index + 1}"
  machine_type = "f1-micro"
  zone         = var.zone_gcp

  boot_disk {
    initialize_params {
      image = "ubuntu-1804-bionic-v20200908"
    }
  }

  metadata_startup_script = file("../install_python.sh")

  network_interface {
    network = "default"

    access_config {
      // Include this section to give the VM an external ip address
    }
  }

  // Apply the firewall rule to allow external IPs to access this instance
  tags = ["http-server", "https-server"]
}

# allow traffic
resource "google_compute_firewall" "http-server" {
  name    = "default-allow-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8000", "8080", "22", "443"]
  }

  // Allow traffic from everywhere to instances with an http-server tag
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

# allow traffic
resource "google_compute_firewall" "https-server" {
  name    = "default-allow-https"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8000", "8080", "22", "443"]
  }

  // Allow traffic from everywhere to instances with an http-server tag
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["https-server"]
}

output "ip" {
  value = "${google_compute_instance.apps.0.network_interface.0.access_config.0.nat_ip}"
}


resource "google_sql_database_instance" "postgres" {
  name             = "postgres-instance-designmatch1"
  database_version = "POSTGRES_12"

  settings {
    tier = "db-f1-micro"

    ip_configuration {

      dynamic "authorized_networks" {
        for_each = google_compute_instance.apps
        iterator = apps

        content {
          name  = apps.value.name
          value = apps.value.network_interface.0.access_config.0.nat_ip
        }
      }
    }
  }
}

resource "google_sql_user" "users" {
  name     = "designmatchadmin"
  instance = google_sql_database_instance.postgres.name
  password = var.password
}