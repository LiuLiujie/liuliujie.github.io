---
category: Computer Science
tag: 
- Ubuntu
- DevOps
---
# Ubuntu

## CLI

### Run ssh in background

`ctrl + z` to put the job into background, and use `bg` to run it

## Network
### WLAN
Connect to network (Someone told me the following method is *WRONG*, but ie works to me):  
cd to `/etc/netplan`, vi or create `50-cloud-init.yaml` with following content
```yaml
network:
  ethernets:
    eth0:
      dhcp4: true
      optional: true
  version: 2
  wifis:
      wlan0:
        dhcp4: true
        access-points:
          "<SSID>":
            password: "<PASSWORD>"
```