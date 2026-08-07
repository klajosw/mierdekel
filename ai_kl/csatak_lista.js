// SVG Ikon Sablonok Hadnemek szerint
const SVG_ICONS = {
    cavalry: '<svg viewBox="0 0 24 24"><path d="M19 3L13 9L15 11L18 8L20 10L17 13L18 15L22 11L19 3ZM4 19L9 14L11 16L6 21H4V19ZM3 5L8 10L10 8L5 3H3V5ZM11 3L9 5L14 10L16 8L11 3Z"/></svg>',
    infantry: '<svg viewBox="0 0 24 24"><path d="M6.92 5H5l7 14 7-14h-1.92L12 14.28 6.92 5zM12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',
    artillery: '<svg viewBox="0 0 24 24"><path d="M4 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm16 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-8-3a1 1 0 1 0 0-2 1 1 0 0 0 0-2zm-7-5l11-4 1 3-11 4-1-3zm13-1l-3-1 1-2 3 1-1 2z"/></svg>',
    navy: '<svg viewBox="0 0 24 24"><path d="M3 18c1.5 0 2.5-.5 3.5-1.5 1 1 2 1.5 3.5 1.5s2.5-.5 3.5-1.5V21H3v-3zm1-3l2-6h12l2 6H4zm8-13v6m-3-3h6"/></svg>',
    tank: '<svg viewBox="0 0 24 24"><path d="M19 15c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2s.9-2 2-2h10c1.1 0 2 .9 2 2zm-3-8h-4V5H9v2H5v3h11V7zM6 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
    fortress: '<svg viewBox="0 0 24 24"><path d="M2 22h20V10l-4-4v2h-2V6l-4-4-4 4v2H6V6L2 10v12zm4-8h2v3H6v-3zm5 0h2v3h-2v-3zm5 0h2v3h-2v-3z"/></svg>'
};

// Magyar történeti csaták adatbázisa (Részletes összefoglaló lezáró lépésekkel)
const BATTLE_DATA = {
    pozsony907: {
        title: "Pozsonyi csata (907)",
        dates: ["907.07.04", "907.07.07"],
        center: [48.14, 17.10],
        zoom: 10,
        attacker: {
            name: "Keleti Frank Királyság (Luitpold bajor herceg)",
            color: "#e53935",
            stats: ["Létszám: ~30,000 - 60,000 fő", "Hadnemek: Nehézgyalogság, nehézlovasság", "Taktika: Frontális megsemmisítő offenzíva"]
        },
        defender: {
            name: "Magyar Fejedelemség (Árpád fejedelem)",
            color: "#1e88e5",
            stats: ["Létszám: ~15,000 - 20,000 fő", "Hadnemek: Könnyűlovasság, íjászok", "Taktika: Színlelt megfutamodás, bekerítés, éjszakai rajtaütés"]
        },
        timeline: [
            {
                date: "907.07.04",
                title: "A frank seregek bekerítése és felmorzsolása",
                desc: "Luitpold bajor herceg a Duna két partján előrenyomuló seregeit a magyar könnyűlovasság szétválasztja. A felperzselt föld és a folyamatos íjásztámadások felmorzsolják a bajor fősereget.",
                arrows: [
                    { from: [48.11, 16.98], to: [48.13, 17.08], color: "#e53935", unit: "infantry", label: "Bajor Duna-északi hadoszlop" },
                    { from: [48.18, 17.15], to: [48.14, 17.10], color: "#1e88e5", unit: "cavalry", label: "Magyar könnyűlovassági átkarolás" }
                ]
            },
            {
                date: "907.07.05",
                title: "A déli frank sereg megsemmisítése",
                desc: "A magyar erők az éjszaka folyamán átkelnek a Dunán, meglepetésszerűen megtámadják a déli bajor hadtestet, és teljesen megsemmisítik Luitpold herceg seregét.",
                arrows: [
                    { from: [48.14, 17.10], to: [48.10, 17.12], color: "#1e88e5", unit: "cavalry", label: "Éjszakai Duna-átkelés és ellenroham" }
                ]
            },
            {
                date: "907.07.07",
                title: "Csata vége - Döntő magyar győzelem",
                desc: "Győztes: Magyar Fejedelemség.\nParancsnokok: Árpád fejedelem vs. Luitpold bajor herceg és Theotmár salzburgi érsek.\nVeszteségek: A bajor sereg szinte teljesen megsemmisült (Luitpold herceg és a bajor elit meghalt); a magyar veszteség csekély.\nEredmény: A Kárpát-medencei magyar állam függetlenségének megszilárdulása 123 évre.",
                arrows: [
                    { from: [48.10, 17.12], to: [48.05, 16.90], color: "#1e88e5", unit: "cavalry", label: "Frank maradványok üldözése Ennsburgig" }
                ]
            }
        ]
    },
    tatari1241: {
        title: "Muhi csata (1241)",
        dates: ["1241.04.10", "1241.04.11"],
        center: [47.96, 20.91],
        zoom: 10,
        attacker: {
            name: "Mongol Birodalom (Batu kán & Szubotáj)",
            color: "#e53935",
            stats: ["Létszám: ~30,000 - 40,000 fő", "Hadnemek: Könnyű- és nehézlovasság, kőhajítók", "Taktika: Kettős átkarolás, hídáttörés"]
        },
        defender: {
            name: "Magyar Királyság (IV. Béla)",
            color: "#1e88e5",
            stats: ["Létszám: ~25,000 - 30,000 fő", "Hadnemek: Nehézlovasság, gyalogság", "Taktika: Szekérvár, passzív védekezés"]
        },
        timeline: [
            {
                date: "1241.04.10",
                title: "A Sajó-híd védelme",
                desc: "Kálmán herceg és Ugrin érsek éjszakai kirohanással visszaveri a Sajó hídján átkelni készülő mongol előőrsöket.",
                arrows: [
                    { from: [47.95, 20.88], to: [47.96, 20.92], color: "#1e88e5", unit: "cavalry", label: "Kálmán herceg sikeres ellencsapása" }
                ]
            },
            {
                date: "1241.04.11",
                title: "Szubotáj átkarolása és a szekérvár ostroma",
                desc: "Hajnalban Szubotáj délebbre átkel a Sajón, míg Batu kőhajítókkal áttöri a hidat. A magyar szekérvárat katlanba szorítják és felégetik.",
                arrows: [
                    { from: [47.92, 20.95], to: [47.96, 20.92], color: "#e53935", unit: "cavalry", label: "Szubotáj déli átkaroló hadművelete" },
                    { from: [47.96, 20.91], to: [47.96, 20.91], color: "#1e88e5", unit: "fortress", label: "Bekerített magyar szekérvár" }
                ]
            },
            {
                date: "1241.04.11",
                title: "Csata vége - Döntő mongol győzelem",
                desc: "Győztes: Mongol Birodalom.\nParancsnokok: Batu kán és Szubotáj vs. IV. Béla király, Kálmán herceg, Ugrin érsek.\nVeszteségek: Magyar oldalról ~10,000 - 20,000 halott (beleértve a főpapi és főúri elit jelentős részét); a mongol veszteség pár ezer fő.\nEredmény: A király elmenekült, az ország védtelenül maradt a tatárjárás pusztításával szemben.",
                arrows: [
                    { from: [47.96, 20.91], to: [47.50, 19.05], color: "#1e88e5", unit: "cavalry", label: "IV. Béla menekülése" }
                ]
            }
        ]
    },
    rozgony1312: {
        title: "Rozgonyi csata (1312)",
        dates: ["1312.06.15"],
        center: [48.75, 21.34],
        zoom: 11,
        attacker: {
            name: "Abák & Csák Máté segédcsapatai (Aba Amadé fiai)",
            color: "#e53935",
            stats: ["Létszám: ~8,000 - 10,000 fő", "Hadnemek: Nehézlovasság, gyalogság", "Taktika: Frontális nehézlovassági roham"]
        },
        defender: {
            name: "Magyar Királyság (I. Károly / Károly Róbert)",
            color: "#1e88e5",
            stats: ["Létszám: ~6,000 - 8,000 fő + Kassa polgárai", "Hadnemek: Királyi bandériumok, szepesi lándzsások", "Taktika: Védelmi vonal tartása, oldaltámadás"]
        },
        timeline: [
            {
                date: "1312.06.15",
                title: "Döntő összecsapás a Tarca mellett",
                desc: "Az Abák nehézlovassága áttöri a királyi középhadtartást, megölve a királyi zászlótartót. Károly Róbert a johanniták és Kassa város felmentő gyalogságának oldalba támadásával nyeri meg a csatát.",
                arrows: [
                    { from: [48.77, 21.32], to: [48.75, 21.34], color: "#e53935", unit: "cavalry", label: "Aba-párti nehézlovassági roham" },
                    { from: [48.72, 21.30], to: [48.74, 21.34], color: "#1e88e5", unit: "infantry", label: "Kassai polgárok és johanniták oldalba támadása" }
                ]
            },
            {
                date: "1312.06.15",
                title: "Csata vége - Döntő királyi győzelem",
                desc: "Győztes: I. Károly (Károly Róbert) király.\nParancsnokok: I. Károly király vs. Aba Amadé fiai (Demeter és Miklós) és Aba Máté.\nVeszteségek: Az Aba-nemzetség vezetői meghaltak, seregük elmenekült; a királyi oldal veszteségei is súlyosak voltak.\nEredmény: A tartományúri (kiskirályi) hatalom megtörésének kezdete Magyarországon.",
                arrows: [
                    { from: [48.75, 21.34], to: [48.71, 21.25], color: "#1e88e5", unit: "cavalry", label: "Károly Róbert bevonulása Kassára" }
                ]
            }
        ]
    },
    nandorfehervar1456: {
        title: "Nándorfehérvári diadal (1456)",
        dates: ["1456.07.04", "1456.07.22"],
        center: [44.82, 20.45],
        zoom: 11,
        attacker: {
            name: "Oszmán Birodalom (II. Mehmed)",
            color: "#e53935",
            stats: ["Létszám: ~70,000 - 80,000 fő, hajóhad", "Hadnemek: Janicsárok, ostromtüzérség", "Taktika: Zárolás és falak rombolása"]
        },
        defender: {
            name: "Magyar Királyság & Keresztesek (Hunyadi János & Kapisztrán)",
            color: "#1e88e5",
            stats: ["Létszám: ~15,000 védő + ~30,000 keresztes", "Hadnemek: Várvédők, sajkás flotta, keresztes gyalogság", "Taktika: Dunai áttörés, elterelő kirohanás"]
        },
        timeline: [
            {
                date: "1456.07.14",
                title: "A dunai hajózár áttörése",
                desc: "Hunyadi János flottája és a magyar sajkások véres küzdelemben áttörik a török flotta lánczárát a Dunán, biztosítva a vár utánpótlását.",
                arrows: [
                    { from: [44.86, 20.38], to: [44.83, 20.44], color: "#1e88e5", unit: "navy", label: "Hunyadi sajkás flotta áttörése" }
                ]
            },
            {
                date: "1456.07.22",
                title: "Döntő kitörés és az oszmán tábor elfoglalása",
                desc: "Kapisztrán keresztesei átkelnek a Száván. Hunyadi kihasználja a zűrzavart, kirohan a várból, elfoglalja a török ágyúkat és megfutamítja a szultánt.",
                arrows: [
                    { from: [44.81, 20.47], to: [44.80, 20.43], color: "#1e88e5", unit: "infantry", label: "Kapisztrán kereszteseinek rohama" },
                    { from: [44.82, 20.45], to: [44.79, 20.44], color: "#1e88e5", unit: "fortress", label: "Hunyadi várvédőinek kitörése" }
                ]
            },
            {
                date: "1456.07.22",
                title: "Csata vége - Világraszóló magyar győzelem",
                desc: "Győztes: Magyar Királyság és a Keresztes sereg.\nParancsnokok: Hunyadi János, Kapisztrán János, Szilágyi Mihály vs. II. Mehmed szultán.\nVeszteségek: Török oldalról ~24,000 halott és a teljes tüzérség elvesztése; a védők vesztesége ~3,000 - 5,000 fő.\nEredmény: Az Oszmán Birodalom terjeszkedése 70 évre megtorpant a Kárpát-medence irányába.",
                arrows: [
                    { from: [44.79, 20.44], to: [44.75, 20.40], color: "#e53935", unit: "infantry", label: "II. Mehmed szultán fejvesztett visszavonulása" }
                ]
            }
        ]
    },
    kenyermezo1479: {
        title: "Kenyérmezei csata (1479)",
        dates: ["1479.10.13"],
        center: [45.89, 23.38],
        zoom: 11,
        attacker: {
            name: "Oszmán Birodalom & Havasalföld (Ali beg)",
            color: "#e53935",
            stats: ["Létszám: ~30,000 - 35,000 fő", "Hadnemek: Akindzsik, janicsárok, havasalföldi gyalogság", "Taktika: Portyázó felhalmozás, bekerítés"]
        },
        defender: {
            name: "Magyar Királyság (Kinizsi Pál & Báthory István)",
            color: "#1e88e5",
            stats: ["Létszám: ~12,000 - 15,000 fő", "Hadnemek: Nehézlovasság, fekete sereg gyalogsága, székelyek", "Taktika: Szárnytámadás, páncélos roham"]
        },
        timeline: [
            {
                date: "1479.10.13",
                title: "Kinizsi Pál felmentő rohama",
                desc: "Báthory István erdélyi vajda serege már majdnem elbukik az oszmán nyomás alatt, amikor Kinizsi Pál temesi bán nehézlovassága oldalba támadja és szétzúzza a török fősereget.",
                arrows: [
                    { from: [45.88, 23.35], to: [45.89, 23.37], color: "#e53935", unit: "infantry", label: "Török nyomás Báthory vonalai ellen" },
                    { from: [45.92, 23.42], to: [45.90, 23.39], color: "#1e88e5", unit: "cavalry", label: "Kinizsi Pál döntő nehézlovassági ellenrohama" }
                ]
            },
            {
                date: "1479.10.13",
                title: "Csata vége - Döntő magyar győzelem",
                desc: "Győztes: Magyar Királyság.\nParancsnokok: Kinizsi Pál és Báthory István vs. Ali beg és Isa beg.\nVeszteségek: Török oldalról ~10,000 - 15,000 halott; magyar oldalról ~3,000 halott.\nEredmény: A Mátyás király korabeli Erdély elleni török betörések hosszú időre megszűntek.",
                arrows: [
                    { from: [45.89, 23.38], to: [45.80, 23.30], color: "#e53935", unit: "cavalry", label: "A török sereg menekülése Zsili-völgy felé" }
                ]
            }
        ]
    },
    mohacs1526: {
        title: "Mohácsi csata (1526)",
        dates: ["1526.08.29"],
        center: [45.96, 18.65],
        zoom: 11,
        attacker: {
            name: "Oszmán Birodalom (I. Szulejmán)",
            color: "#e53935",
            stats: ["Létszám: ~60000 - 70000 fő, 300 ágyú", "Hadnemek: Janicsárok, szpáhik, tüzérség", "Taktika: Szilárd védelmi sánc, tüzérségi pusztítás"]
        },
        defender: {
            name: "Magyar Királyság (II. Lajos & Tomori Pál)",
            color: "#1e88e5",
            stats: ["Létszám: ~25,000 fő, 85 ágyú", "Hadnemek: Nehézlovasság, gyalogság", "Taktika: Frontális nehézlovassági roham"]
        },
        timeline: [
            {
                date: "1526.08.29",
                title: "A magyar nehézlovasság rohama és a tragikus bukás",
                desc: "Délután 3 órakor Tomori Pál parancsára a magyar nehézlovasság áttöri a ruméliai hadtestet, de a janicsárok puskatüze és a megerősített oszmán ágyúsor felmorzsolja a rohamot.",
                arrows: [
                    { from: [45.98, 18.66], to: [45.94, 18.64], color: "#1e88e5", unit: "cavalry", label: "Magyar nehézlovassági roham" },
                    { from: [45.92, 18.62], to: [45.95, 18.63], color: "#e53935", unit: "artillery", label: "Oszmán ágyútűz és bekerítő csapás" }
                ]
            },
            {
                date: "1526.08.29",
                title: "Csata vége - Megsemmisítő oszmán győzelem",
                desc: "Győztes: Oszmán Birodalom.\nParancsnokok: I. Szulejmán szultán és Ibrahim nagyvezír vs. II. Lajos király és Tomori Pál érsek.\nVeszteségek: Magyar oldalról ~15,000 - 20,000 halott (beleértve a királyt, 2 érseket, 5 püspököt és a magyar nemesség nagyját); török veszteség ~1,500 - 3,000 fő.\nEredmény: A középkori magyar állam összeomlása és az 150 éves török hódoltság kezdete.",
                arrows: [
                    { from: [45.95, 18.63], to: [45.98, 18.70], color: "#1e88e5", unit: "infantry", label: "II. Lajos menekülése és halála a Csele-pataknál" }
                ]
            }
        ]
    },
    egervar1552: {
        title: "Eger ostroma (1552)",
        dates: ["1552.09.09", "1552.10.17"],
        center: [47.90, 20.37],
        zoom: 12,
        attacker: {
            name: "Oszmán Birodalom (Kara Ahmed & Szokollu Mehmed)",
            color: "#e53935",
            stats: ["Létszám: ~40,000 - 50,000 fő", "Hadnemek: Janicsárok, ostromtüzérség", "Taktika: Folyamatos ágyúzás, tömeges falroham"]
        },
        defender: {
            name: "Egri Várvédők (Dobó István)",
            color: "#1e88e5",
            stats: ["Létszám: ~2,000 - 2,100 fő (katonák és nők)", "Hadnemek: Várvédő gyalogság, tüzérség", "Taktika: Aktív várvédelem, szurok- és tüzeskerék-vetés"]
        },
        timeline: [
            {
                date: "1552.10.12",
                title: "A döntő általános oszmán roham",
                desc: "A török erők egyszerre több szakaszon (Béke-bástya, Ó-kapu) rohanják meg az elpusztított falakat. Az egri nők és a védők heroikus küzdelemben visszaverik az ostromlókat.",
                arrows: [
                    { from: [47.89, 20.36], to: [47.90, 20.37], color: "#e53935", unit: "infantry", label: "Török gyalogsági falroham" },
                    { from: [47.90, 20.38], to: [47.90, 20.37], color: "#1e88e5", unit: "fortress", label: "Dobó István várvédőinek ellencsapása" }
                ]
            },
            {
                date: "1552.10.17",
                title: "Csata vége - Hősi magyar győzelem",
                desc: "Győztes: Egri Várvédők (Magyar Királyság).\nParancsnokok: Dobó István és Mekcsey István vs. Kara Ahmed pasa és Szokollu Mehmed pasa.\nVeszteségek: Török oldalról ~8,000 - 10,000 halott; a védők közül ~500 halott és sok sebesült.\nEredmény: Megállították az 1552-es oszmán hadjáratot, és Eger megvédte Észak-Magyarországot.",
                arrows: [
                    { from: [47.90, 20.37], to: [47.85, 20.30], color: "#e53935", unit: "infantry", label: "Török seregek elvonulása Eger alól" }
                ]
            }
        ]
    },
    szigetvar1566: {
        title: "Szigetvári csata (1566)",
        dates: ["1566.08.06", "1566.09.07"],
        center: [46.04, 17.80],
        zoom: 12,
        attacker: {
            name: "Oszmán Birodalom (I. Szulejmán szultán)",
            color: "#e53935",
            stats: ["Létszám: ~60,000 - 80,000 fő", "Hadnemek: Janicsárok, ostromtüzérség, aknászok", "Taktika: Mocsarak lecsapolása, aknarobbantás"]
        },
        defender: {
            name: "Szigetvári védők (Zrínyi Miklós)",
            color: "#1e88e5",
            stats: ["Létszám: ~2,300 - 2,500 fő", "Hadnemek: Várvédő gyalogság, tüzérség", "Taktika: Szakaszonkénti visszavonulás, kitörés"]
        },
        timeline: [
            {
                date: "1566.09.07",
                title: "Zrínyi Miklós hősi kitörése",
                desc: "A belső vár lángba borulása után Zrínyi Miklós fennmaradt maroknyi seregével kitör a várból, felvállalva a biztos hősi halált.",
                arrows: [
                    { from: [46.04, 17.80], to: [46.04, 17.81], color: "#1e88e5", unit: "infantry", label: "Zrínyi Miklós kitörése a belső várból" },
                    { from: [46.05, 17.82], to: [46.04, 17.81], color: "#e53935", unit: "infantry", label: "Janicsárok bekerítő tűzcsapása" }
                ]
            },
            {
                date: "1566.09.07",
                title: "Csata vége - Török stratégiai pirruszi győzelem",
                desc: "Győztes: Oszmán Birodalom (a várat elfoglalták, de főseregük elvérzett).\nParancsnokok: Sokollu Mehmed nagyvezír (I. Szulejmán szultán a csata közben meghalt) vs. Zrínyi Miklós.\nVeszteségek: Török oldalról ~20,000 - 25,000 halott (köztük a szultán); a magyar és horvát védők szinte mind egy szálig meghaltak.\nEredmény: Bécs elleni oszmán hadjárat elmaradása a török sereg óriási veszteségei miatt.",
                arrows: [
                    { from: [46.04, 17.81], to: [46.04, 17.80], color: "#e53935", unit: "fortress", label: "Elfoglalt, lerombolt szigetvári vár" }
                ]
            }
        ]
    },
    majtény1711: {
        title: "A Rákóczi-szabadságharc lezárása – Majtényi sík (1711)",
        dates: ["1711.04.30", "1711.05.01"],
        center: [47.71, 22.62],
        zoom: 11,
        attacker: {
            name: "Habsburg Birodalom (Pálffy János)",
            color: "#e53935",
            stats: ["Létszám: ~10,000 fő", "Hadnemek: Császári vértesek, gyalogság", "Taktika: Békekikényszerítés, bekerítés"]
        },
        defender: {
            name: "Kuruc Sereg (Károlyi Sándor)",
            color: "#1e88e5",
            stats: ["Létszám: ~12,000 fő", "Hadnemek: Kuruc lovasság, hajdú gyalogság", "Taktika: Ünnepélyes fegyverletétel (szatmári béke)"]
        },
        timeline: [
            {
                date: "1711.05.01",
                title: "A szatmári béke és a zászlók letétele",
                desc: "A Majtényi-síkon 12 000 kuruc felkelő ünnepélyes keretek között leteszi a fegyvert és átadja 149 zászlóját a császári biztosoknak a szatmári béke feltételei alapján.",
                arrows: [
                    { from: [47.70, 22.60], to: [47.71, 22.62], color: "#1e88e5", unit: "cavalry", label: "Kuruc ezredek felvonulása a majtényi síkra" }
                ]
            },
            {
                date: "1711.05.01",
                title: "Csata vége - Békekötés és a szabadságharc lezárása",
                desc: "Győztes: Kompromisszumos szatmári béke (Habsburg felügyelet).\nParancsnokok: Gróf Pálffy János császári tábornagy vs. Gróf Károlyi Sándor kuruc főgenerális (II. Rákóczi Ferenc távollétében).\nVeszteségek: Csatára nem került sor (0 halott), ünnepélyes kegyelem és fegyverletétel.\nEredmény: A Rákóczi-szabadságharc lezárulása; Magyarország rendi alkotmányának és vallásszabadságának megőrzése.",
                arrows: [
                    { from: [47.71, 22.62], to: [47.71, 22.62], color: "#1e88e5", unit: "infantry", label: "Hűségeskü és közkegyelem kihirdetése" }
                ]
            }
        ]
    },
    pacozo1848: {
        title: "Pákozdi csata (1848)",
        dates: ["1848.09.29"],
        center: [47.21, 18.55],
        zoom: 11,
        attacker: {
            name: "Habsburg / Bánsági sereg (Josip Jelačić bán)",
            color: "#e53935",
            stats: ["Létszám: ~45,000 - 50,000 fő", "Hadnemek: Határőrző gyalogság, lovasság, tüzérség", "Taktika: Frontális áttörés Pest felé"]
        },
        defender: {
            name: "Magyar Honvédség (Móga János)",
            color: "#1e88e5",
            stats: ["Létszám: ~17,000 - 18,000 fő", "Hadnemek: Nemzetőrség, honvéd gyalogság, tüzérség", "Taktika: Magaslati védelmi vonal felvétele"]
        },
        timeline: [
            {
                date: "1848.09.29",
                title: "Jelačić rohamának összeomlása a Velencei-tónál",
                desc: "Jelačić csapatai megtámadják Pákozd és Sukoró közötti magyar állásokat. A magyar tüzérség és a honvédek hősiesen visszaverik a rohamot, fegyverszünetre kényszerítve a bánt.",
                arrows: [
                    { from: [47.19, 18.52], to: [47.21, 18.55], color: "#e53935", unit: "infantry", label: "Jelačić gyalogsági rohama" },
                    { from: [47.23, 18.58], to: [47.22, 18.56], color: "#1e88e5", unit: "artillery", label: "Magyar tüzérségi ellencsapás Pákozdnál" }
                ]
            },
            {
                date: "1848.09.29",
                title: "Csata vége - Döntő magyar taktikai győzelem",
                desc: "Győztes: Magyar Honvédség.\nParancsnokok: Móga János altábornagy vs. Josip Jelačić horvát bán.\nVeszteségek: Magyar oldalról ~70 halott és sebesült; a horvát oldal vesztesége ~100-200 fő.\nEredmény: A főváros megmentése, Jelačić megfutamodása Bécs felé, a magyar szabadságharc katonai önvédelmének sikeres kezdete.",
                arrows: [
                    { from: [47.21, 18.55], to: [47.15, 18.35], color: "#e53935", unit: "cavalry", label: "Jelačić seregeinek megfutamodása Győr felé" }
                ]
            }
        ]
    },
    isaszeg1849: {
        title: "Isaszegi csata (1849)",
        dates: ["1849.04.06"],
        center: [47.53, 19.35],
        zoom: 11,
        attacker: {
            name: "Habsburg Császári Sereg (Alfred von Windisch-Grätz)",
            color: "#e53935",
            stats: ["Létszám: ~50,000 fő", "Hadnemek: Vértesek, császári gyalogság, tüzérség", "Taktika: Ellentámadás a Rákos-patak vonalán"]
        },
        defender: {
            name: "Magyar Honvédség (Görgei Artúr, Klapka, Damjanich)",
            color: "#1e88e5",
            stats: ["Létszám: ~31,000 fő", "Hadnemek: Honvéd zászlóaljak, huszárok, tüzérség", "Taktika: Tavaszi hadjárat döntő átkaroló csapása"]
        },
        timeline: [
            {
                date: "1849.04.06",
                title: "Görgei és Damjanich győzelme Isaszegnél",
                desc: "Damjanich és Klapka testületei kemény erdei harcokban megtartják az állásaikat, majd Görgei megérkezésével a magyar huszárok elűzik a császári fősereget Pest felé.",
                arrows: [
                    { from: [47.51, 19.33], to: [47.53, 19.35], color: "#e53935", unit: "infantry", label: "Windisch-Grätz támadása az isaszegi erdőben" },
                    { from: [47.55, 19.38], to: [47.54, 19.36], color: "#1e88e5", unit: "cavalry", label: "Damjanich és Görgei huszár ellenrohama" }
                ]
            },
            {
                date: "1849.04.06",
                title: "Csata vége - Döntő magyar győzelem",
                desc: "Győztes: Magyar Honvédség.\nParancsnokok: Görgei Artúr fővezér, Damjanich János, Klapka György vs. Alfred von Windisch-Grätz herceg.\nVeszteségek: Magyar oldalról ~800-1000 halott és sebesült; császári oldalról ~2000 halott, sebesült és fogoly.\nEredmény: A Tavaszi hadjárat csúcspontja; a császári erők kiűzése Pest-Budáról és a Függetlenségi Nyilatkozat előkészítése.",
                arrows: [
                    { from: [47.53, 19.35], to: [47.50, 19.10], color: "#e53935", unit: "infantry", label: "A császári fősereg visszavonulása Pest felé" }
                ]
            }
        ]
    },
    doniatttores1943: {
        title: "Doni katasztrófa / Uryiv-i áttörés (1943)",
        dates: ["1943.01.12", "1943.01.16"],
        center: [51.05, 39.20],
        zoom: 9,
        attacker: {
            name: "Szovjetunió (Vörös Hadsereg - Golikov tábornok)",
            color: "#e53935",
            stats: ["Létszám: ~200,000 fő, páncélos hadtestek", "Hadnemek: T-34 páncélosok, nehéztüzérség, gyalogság", "Taktika: Téli hídfő-áttörés és katlan-képzés"]
        },
        defender: {
            name: "2. Magyar Hadsereg (Jány Gusztáv)",
            color: "#1e88e5",
            stats: ["Létszám: ~200,000 fő (hiányos nehézfegyverzet)", "Hadnemek: Gyalogság, páncélos dandár", "Taktika: Statikus védelmi vonal a Don folyó mentén"]
        },
        timeline: [
            {
                date: "1943.01.12",
                title: "A szovjet áttörés az uryivi hídfőből",
                desc: "-30 fokos fagyban a Vörös Hadsereg tömeges tüzérségi előkészítés után áttörit a 2. magyar hadsereg vonalait Uryivnál, katlanba zárva a magyar alakulatokat.",
                arrows: [
                    { from: [51.10, 39.28], to: [51.05, 39.15], color: "#e53935", unit: "tank", label: "Szovjet páncélos áttörés Uryivnál" },
                    { from: [50.98, 39.18], to: [50.95, 39.05], color: "#1e88e5", unit: "infantry", label: "2. magyar hadsereg visszavonulása" }
                ]
            },
            {
                date: "1943.01.16",
                title: "Csata vége - Megsemmisítő szovjet áttörés",
                desc: "Győztes: Szovjetunió (Vörös Hadsereg).\nParancsnokok: Filip Golikov vezérezredes vs. Jány Gusztáv vezérezredes.\nVeszteségek: Magyar oldalról ~100,000 - 120,000 ember (halott, sebesült, fogságba esett); a szovjet veszteség jóval csekélyebb.\nEredmény: A 2. magyar hadsereg felmorzsolódása, a magyar hadtörténet egyik legnagyobb tragédiája.",
                arrows: [
                    { from: [50.95, 39.05], to: [50.80, 38.50], color: "#1e88e5", unit: "infantry", label: "A magyar maradványok visszavonulása nyugat felé" }
                ]
            }
        ]
    },
    budapest1944: {
        title: "Budapest ostroma (1944–1945)",
        dates: ["1944.12.25", "1945.02.11", "1945.02.13"],
        center: [47.50, 19.04],
        zoom: 11,
        attacker: {
            name: "Szovjetunió & Románia (Malinovszkij & Tolbuchin)",
            color: "#e53935",
            stats: ["Létszám: ~500,000 fő", "Hadnemek: Gyalogság, páncélosok, nehéztüzérség", "Taktika: Teljes városi bekerítés és utcharól utcára haladás"]
        },
        defender: {
            name: "Magyar & Német védők (Pfeffer-Wildenbruch & Hindy Iván)",
            color: "#1e88e5",
            stats: ["Létszám: ~70,000 - 80,000 fő", "Hadnemek: Honvéd alakulatok, SS páncélosok, várvédők", "Taktika: Házról házra való védekezés, kitörési kísérlet"]
        },
        timeline: [
            {
                date: "1944.12.25",
                title: "Budapest teljes bekerítése",
                desc: "A szovjet páncélos ékek nyugaton egyesülnek, teljesen körülzárva a fővárost. Megkezdődik a II. világháború egyik leghosszabb városostroma.",
                arrows: [
                    { from: [47.55, 18.90], to: [47.50, 19.00], color: "#e53935", unit: "tank", label: "Szovjet bekerítő gyűrű bezárulása" }
                ]
            },
            {
                date: "1945.02.11",
                title: "A tragikus budai kitörési kísérlet",
                desc: "A Várba szorult maroknyi magyar és német védősereg megpróbálja áttörni a szovjet gyűrűt a Széll Kálmán tér és a Budaörsi út irányában.",
                arrows: [
                    { from: [47.50, 19.03], to: [47.52, 18.98], color: "#1e88e5", unit: "infantry", label: "Kétségedbeesett kitörési roham a Budai Várbol" },
                    { from: [47.53, 18.95], to: [47.52, 18.97], color: "#e53935", unit: "artillery", label: "Szovjet zárótűz a Budai-hegyekben" }
                ]
            },
            {
                date: "1945.02.13",
                title: "Csata vége - Szovjet győzelem és a főváros eleste",
                desc: "Győztes: Szovjetunió (2. és 3. Ukrán Front).\nParancsnokok: Rodyion Malinovszkij és Fjodor Tolbuchin vs. Karl Pfeffer-Wildenbruch és Hindy Iván vezérezredes.\nVeszteségek: Védők: ~50,000 halott és 30,000 fogoly; Szovjet oldal: ~80,000 halott és 200,000 sebesült. Polgári áldozatok: ~38,000 pesti és budai lakos.\nEredmény: Budapest szovjet megszállás alá kerülése, a magyarországi harcok végső szakasza.",
                arrows: [
                    { from: [47.50, 19.04], to: [47.50, 19.04], color: "#e53935", unit: "fortress", label: "Budapest teljes szovjet ellenőrzés alatt" }
                ]
            }
        ]
    }
};