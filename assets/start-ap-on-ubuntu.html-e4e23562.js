import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,d as n}from"./app-9e8a13db.js";const i={},l=n(`<h1 id="start-a-ap-on-ubuntu-22-04-for-your-raspberry-pi-4b" tabindex="-1"><a class="header-anchor" href="#start-a-ap-on-ubuntu-22-04-for-your-raspberry-pi-4b" aria-hidden="true">#</a> Start a AP on Ubuntu 22.04 for your Raspberry Pi 4B</h1><p>I woule like to use my Rasp 4B to start an AP for my internal network. Here is my configurations.</p><ol><li>Install packages needed: <code>hostapd</code> is used to start an AP, and dnsmasq is a DHCP service for assigning IP address to connected devices.</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> dnsmasq hostapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>Configure a static IP to your wireless interface (e.g. <code>wlan0</code>). You can check your interface using <code>ifconfig</code></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/netplan/&lt;your-net-plan-file&gt;.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and assign a static ip to your network interface, for example, the file can looks like with static address <code>192.168.8.1/24</code>. This IP will become the default gateway of your AP network.</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">network</span><span class="token punctuation">:</span>
    <span class="token key atrule">ethernets</span><span class="token punctuation">:</span>
        <span class="token key atrule">eth0</span><span class="token punctuation">:</span>
            <span class="token key atrule">dhcp4</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">optional</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">wlan0</span><span class="token punctuation">:</span>
          <span class="token key atrule">addresses</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> 192.168.4.1/24
    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>Configure hostapd</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/hostapd/hostapd.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>with following configurations</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># This is the name of the WiFi interface we configured above
interface=wlan0

# Use the nl80211 driver with the brcmfmac driver
#driver=nl80211

# This is the name of the network
ssid=&lt;your-ssid&gt;

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
wpa_passphrase=&lt;your-ap-password&gt;

# Use AES, instead of TKIP
rsn_pairwise=CCMP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then, tell hostapd to use this configuration file</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/default/hostapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and set</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DAEMON_CONF=&quot;/etc/hostapd/hostapd.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After that, start the hostapd</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl unmask hostapd
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> hostapd
<span class="token function">sudo</span> systemctl start hostapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>and your can find a new AP network on your phone without internet connection.</p><ol start="4"><li>Configure dnsmasq for DHCP</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/dnsmasq.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and uncomment and set the following. Note that the <code>dhcp-range</code> show be the same IP range as the static IP you set for your interface before.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interface=wlan0
dhcp-range=192.168.4.2,192.168.4.100,255.255.255.0,24h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>After that, restart the dnsmasq</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart dnsmasq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Note: you may meet a problem in this step becuase the prot 53 is occupied by another service <code>systemd-resolve</code>. You can shut it down by</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/systemd/resolved.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and uncommet the 2 items</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># DNS Service, like 8.8.8.8 from Google
DNS = &lt;your-dns-service&gt; 
DNSStubListener = no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>then, restart the service</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart systemd-resolve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>Configure NAT</li></ol><p>Firstly, enable the kernel network forwarding</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/sysctl.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and uncomment</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net.ipv4.ip_forward=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then, set thee iptable firewall for network forwarding</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> MASQUERADE  
iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-o</span> wlan0 <span class="token parameter variable">-m</span> state <span class="token parameter variable">--state</span> RELATED,ESTABLISHED <span class="token parameter variable">-j</span> ACCEPT  
<span class="token function">sudo</span> iptables <span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> wlan0 <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After that, check changes</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@rasp:~<span class="token comment"># sudo iptables -t nat -S</span>
<span class="token parameter variable">-P</span> PREROUTING ACCEPT
<span class="token parameter variable">-P</span> INPUT ACCEPT
<span class="token parameter variable">-P</span> OUTPUT ACCEPT
<span class="token parameter variable">-P</span> POSTROUTING ACCEPT
<span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-o</span> wlan0 <span class="token parameter variable">-j</span> MASQUERADE

root@rasp:~<span class="token comment"># sudo iptables -S</span>
<span class="token parameter variable">-P</span> INPUT ACCEPT
<span class="token parameter variable">-P</span> FORWARD ACCEPT
<span class="token parameter variable">-P</span> OUTPUT ACCEPT
<span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> wlan0 <span class="token parameter variable">-o</span> wlan1 <span class="token parameter variable">-m</span> state <span class="token parameter variable">--state</span> RELATED,ESTABLISHED <span class="token parameter variable">-j</span> ACCEPT
<span class="token parameter variable">-A</span> FORWARD <span class="token parameter variable">-i</span> wlan1 <span class="token parameter variable">-o</span> eth0 <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>and then persist</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;iptables-save &gt; /etc/iptables.ipv4.nat&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,42),t=[l];function r(d,c){return a(),s("div",null,t)}const v=e(i,[["render",r],["__file","start-ap-on-ubuntu.html.vue"]]);export{v as default};
