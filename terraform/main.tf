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


# Compute address - static_ip - MDA
resource "google_compute_address" "static_mda" {
  name = "ipv4-address-static-ip-mda"
}

# Compute address - static_ip - MDB
resource "google_compute_address" "static_mdb" {
  count = var.node_count
  name = "ipv4-address-static-ip-mdb-${count.index + 1}"
}

# create the compute engine instance MDA
resource "google_compute_instance" "apps_mda" {
  count        = 1
  name         = "designmatch-apps-mda-${count.index + 1}"
  machine_type = "f1-micro"
  zone         = var.zone_gcp

  boot_disk {
    initialize_params {
      image = "ubuntu-1804-bionic-v20200908"
    }
  }

  # metadata_startup_script = file("../install_python.sh")

  network_interface {
    network = "default"

    access_config {
      nat_ip = google_compute_address.static_mda.address
    }
  }

  // Apply the firewall rule to allow external IPs to access this instance
  tags = ["http-server", "https-server"]
}

# create the compute engine instance MDB
resource "google_compute_instance" "apps_mdb" {
  count        = var.node_count
  name         = "designmatch-apps-mdb-${count.index + 1}"
  machine_type = "f1-micro"
  zone         = var.zone_gcp

  boot_disk {
    initialize_params {
      image = "ubuntu-1804-bionic-v20200908"
    }
  }

  # metadata_startup_script = file("../install_python.sh")

  network_interface {
    network = "default"

    access_config {
      nat_ip = "${element(google_compute_address.static_mdb.*.address, count.index)}"
    }
  }

  // Apply the firewall rule to allow external IPs to access this instance
  tags = ["http-server", "https-server"]
}

# allow traffic for MDA & MDB - http
resource "google_compute_firewall" "http-server" {
  name    = "default-allow-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8000", "8080", "22", "443", "2049", "111"]
  }

  // Allow traffic from everywhere to instances with an http-server tag
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

# allow traffic for MDA & MDB - https
resource "google_compute_firewall" "https-server" {
  name    = "default-allow-https"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8000", "8080", "22", "443", "2049", "111"]
  }

  // Allow traffic from everywhere to instances with an http-server tag
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["https-server"]
}

# Database configuration MDA
resource "google_sql_database_instance" "postgres_mda" {
  name             = "postgres-instance-designmatch-mda"
  database_version = "POSTGRES_12"

  settings {
    tier = "db-f1-micro"

    ip_configuration {

      dynamic "authorized_networks" {
        for_each = google_compute_instance.apps_mda
        iterator = apps

        content {
          name  = apps.value.name
          value = apps.value.network_interface.0.access_config.0.nat_ip
        }
      }
    }
  }
}

resource "google_sql_database" "database_mda" {
  name     = "designmatch-mda"
  instance = google_sql_database_instance.postgres_mda.name
}

resource "google_sql_user" "users_mda" {
  name     = "designmatchadmin"
  instance = google_sql_database_instance.postgres_mda.name
  password = var.password
}

# Database configuration MDB
resource "google_sql_database_instance" "postgres_mdb" {
  name             = "postgres-instance-designmatch-mdb"
  database_version = "POSTGRES_12"

  settings {
    tier = "db-f1-micro"

    ip_configuration {

      dynamic "authorized_networks" {
        for_each = google_compute_instance.apps_mdb
        iterator = apps

        content {
          name  = apps.value.name
          value = apps.value.network_interface.0.access_config.0.nat_ip
        }
      }
    }
  }
}


resource "google_sql_database" "database_mdb" {
  name     = "designmatch-mdb"
  instance = google_sql_database_instance.postgres_mdb.name
}

resource "google_sql_user" "users_mdb" {
  name     = "designmatchadmin"
  instance = google_sql_database_instance.postgres_mdb.name
  password = var.password
}