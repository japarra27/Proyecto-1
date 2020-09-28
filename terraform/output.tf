# Imprimir IP - MDA
output "ip_mda" {
  value = "${google_compute_instance.apps_mda.0.network_interface.0.access_config.0.nat_ip}"
}

# Imprimir IP - MDB
output "ip_mdb1" {
  value = "${google_compute_instance.apps_mda.0.network_interface.0.access_config.0.nat_ip} - MDB1"
}

# Imprimir IP - MDB
output "ip_mdb2" {
  value = "${google_compute_instance.apps_mda.0.network_interface.0.access_config.0.nat_ip} - MDB2"
}
# Imprimir IP - MDB
output "ip_mdb3" {
  value = "${google_compute_instance.apps_mda.0.network_interface.0.access_config.0.nat_ip} - MDB3"
}