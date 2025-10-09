# Resource Loading APIs: Mana App ni Fast Cheyyadam! ⚡

Hey mawa! Welcome to one of the coolest parts of modern web development: **Resource Loading**. Ee APIs mana app యొక్క performance ni chala improve chesthayi.

Mana app run avvadaniki chala bayata nunchi assets (stylesheets, scripts, fonts, images) avasaram untayi. Browser ee assets ni adigina ventane download cheyyadu. Daaniki konni steps untayi:
1.  **DNS Lookup:** Server peru (`example.com`) ni theeskuni, daani IP address (`93.184.216.34`) ni kanukkuntundi.
2.  **TCP Handshake:** Browser aa server tho connection establish cheskuntundi.
3.  **TLS Handshake:** Connection secure cheyyadaniki (HTTPS).
4.  **Download:** Finally, asset ni download cheyyadam start chesthundi.
5.  **Execute:** Script aithe execute chesthundi, stylesheet aithe apply chesthundi.

Ee steps anni time theeskuntayi. Ee "waiting time" ni thaggichadanike, React manaki konni special functions isthundi. Veetini "Resource Hints" antaru. Ee functions tho, manam browser ki mundhe cheppochu, "Hey, naaku ee assets future lo avasaram untayi, nuvvu ippude nee pani start cheyyi" ani.

### The Four Main APIs

React DOM lo manaki nalugu main resource loading APIs unnayi. Prathi daaniki oka specific purpose undi.

1.  **`prefetchDNS(href)`:**
    *   **Pani:** DNS Lookup matrame chesthundi. (Step 1)
    *   **Cost:** Chala cheap.
    *   **Eppudu Vadali:** Manam chala different domains nunchi chinna chinna assets load cheyyali anukunnappudu. For example, analytics providers, A/B testing scripts, etc.

2.  **`preconnect(href)`:**
    *   **Pani:** DNS Lookup, TCP Handshake, and TLS Handshake chesthundi. (Steps 1, 2, 3)
    *   **Cost:** Konchem expensive, endukante server tho connection open chesthundi.
    *   **Eppudu Vadali:** Manam oka specific server nunchi multiple assets (e.g., fonts and CSS from Google Fonts) load cheyyali ani thelisinappudu.

3.  **`preload(href, options)`:**
    *   **Pani:** Resource ni download chesi, memory lo ready ga peduthundi. Kani, daanini execute cheyyadu. (Steps 1, 2, 3, 4)
    *   **Cost:** More expensive, endukante data ni download chesthundi.
    *   **Eppudu Vadali:** Ee current page lo **pakka ga** avasaram ayye high-priority resource (e.g., the main stylesheet, a hero image, or a critical font) kosam.

4.  **`preinit(href, options)`:**
    *   **Pani:** Resource ni download chesi, **ventane execute/apply** chesthundi. (Steps 1, 2, 3, 4, 5)
    *   **Cost:** Most expensive.
    *   **Eppudu Vadali:** Ee page ki absolutely critical ayina resource kosam, and adi load ayina ventane run avvali anukunnappudu (e.g., a high-priority script that needs to run ASAP).

### Quick Summary Table

| Function | What it does | Use Case |
| :--- | :--- | :--- |
| `prefetchDNS` | DNS Lookup Only | Many different, low-priority domains. |
| `preconnect` | Warms up connection | A few important, known domains. |
| `preload` | Downloads resource | High-priority resource for *this* page. |
| `preinit` | Downloads & Executes | Highest-priority resource for *this* page. |

Ee overview tho, ippudu manam prathi function ni detail ga, examples tho chuddam. Let's go! 🚀