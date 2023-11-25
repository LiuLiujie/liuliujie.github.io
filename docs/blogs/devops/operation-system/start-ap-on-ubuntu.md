---
category: Computer Science
tag: 
- Ubuntu
- Raspbarry Pi
---

# Start a AP on Ubuntu 22.04 for your Raspberry Pi 4B
I woule like to use my Rasp 4B to start an AP for my internal network. Here is my configurations.



1. Install packages needed: `hostapd` is used to start an AP, and dnsmasq is a DHCP service for assigning IP address to connected devices. 
```bash
sudo apt install dnsmasq hostapd
```
2. Configure a static IP to your wireless interface (e.g. `wlan0`). You can check your interface using `ifconfig`
```
vi /etc/netplan/<your-net-plan-file>.yaml
```
and assign a static ip to your network interface, for example, the file can looks like with static address `192.168.8.1/24`. This IP will become the default gateway of your AP network.
```yaml
network:
    ethernets:
        eth0:
            dhcp4: true
            optional: true
        wlan0:
          addresses:
          - 192.168.4.1/24
    version: 2
```
3. Configure hostapd
```bash
vi /etc/hostapd/hostapd.conf
```
with following configurations
```
# This is the name of the WiFi interface we configured above
interface=wlan0

# Use the nl80211 driver with the brcmfmac driver
#driver=nl80211

# This is the name of the network
ssid=<your-ssid>

# Use g for the 2.4GHz band or a for 5GHz band
hw_mode=g

# Use channel 6 for 2.4GHz or other legal channel for 5GHz
channel=6

# Enable 802.11n
ieee80211n=1

# Enable WMM
wmm_enabled=1

# [Optinal for 2.4GHz]
# Enable 40MHz channels with 20ns guard interval
#ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]

# Accept all MAC addresses
macaddr_acl=0

# Use WPA authentication
auth_algs=1

# Require clients to know the network name
ignore_broadcast_ssid=0

# Use WPA2
wpa=2

# Use a pre-shared key
wpa_key_mgmt=WPA-PSK

# The network passphrase
wpa_passphrase=<your-ap-password>

# Use AES, instead of TKIP
rsn_pairwise=CCMP
```
Then, tell hostapd to use this configuration file
```
vi /etc/default/hostapd
```
and set
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```
After that, start the hostapd
```bash
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd
```
and your can find a new AP network on your phone without internet connection.

4. Configure dnsmasq for DHCP
```bash
vi /etc/dnsmasq.conf
```
and uncomment and set the following. Note that the `dhcp-range` show be the same IP range as the static IP you set for your interface before.
```
interface=wlan0
dhcp-range=192.168.4.2,192.168.4.100,255.255.255.0,24h
```
After that, restart the dnsmasq
```bash
systemctl restart dnsmasq
```
Note: you may meet a problem in this step becuase the prot 53 is occupied by another service `systemd-resolve`. You can shut it down by
```bash
vi /etc/systemd/resolved.conf
```
and uncommet the 2 items

```
# DNS Service, like 8.8.8.8 from Google
DNS = <your-dns-service> 
DNSStubListener = no
```

then, restart the service
```bash
systemctl restart systemd-resolve
```

5. Configure NAT 

Firstly, enable the kernel network forwarding
```bash
vi /etc/sysctl.conf
```
and uncomment
```
net.ipv4.ip_forward=1
```
Then, set thee iptable firewall for network forwarding
```bash
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE  
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT  
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
```
After that, check changes
```bash
root@rasp:~# sudo iptables -t nat -S
-P PREROUTING ACCEPT
-P INPUT ACCEPT
-P OUTPUT ACCEPT
-P POSTROUTING ACCEPT
-A POSTROUTING -o wlan0 -j MASQUERADE

root@rasp:~# sudo iptables -S
-P INPUT ACCEPT
-P FORWARD ACCEPT
-P OUTPUT ACCEPT
-A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -i wlan1 -o eth0 -j ACCEPT
```
and then persist
```bash
sh -c "iptables-save > /etc/iptables.ipv4.nat"
```