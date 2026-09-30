"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Language = "fr" | "ar" | "en";

const translations: Record<string, Partial<Record<Language, string>>> = {
  "Home": { fr: "Accueil", ar: "الرئيسية" },
  "Menu": { fr: "Menu", ar: "القائمة" },
  "Our Story": { fr: "Notre histoire", ar: "قصتنا" },
  "Gallery": { fr: "Galerie", ar: "معرض الصور" },
  "Visit Us": { fr: "Nous visiter", ar: "زورونا" },
  "View Menu": { fr: "Voir le menu", ar: "عرض القائمة" },
  "Discover Our Menu": { fr: "Découvrir notre menu", ar: "اكتشف قائمتنا" },
  "Moroccan Specialty Coffee & Bakery": { fr: "Café de spécialité et boulangerie marocaine", ar: "قهوة مختصة ومخبوزات مغربية" },
  "Open navigation menu": { fr: "Ouvrir le menu de navigation", ar: "فتح قائمة التنقل" },
  "Close navigation menu": { fr: "Fermer le menu de navigation", ar: "إغلاق قائمة التنقل" },
  "Main Navigation": { fr: "Navigation principale", ar: "التنقل الرئيسي" },
  "Select language": { fr: "Choisir la langue", ar: "اختر اللغة" },
  "Hero Section": { fr: "Bannière principale", ar: "القسم الرئيسي" },
  "Where": { fr: "Là où", ar: "حيث" },
  "Elegance": { fr: "l’élégance", ar: "الأناقة" },
  "Meets Flavor": { fr: "rencontre la saveur", ar: "تلتقي بالنكهة" },
  "Artisan pastries, specialty coffee, and moments worth savoring.": { fr: "Pâtisseries artisanales, café de spécialité et instants à savourer.", ar: "حلويات حرفية وقهوة مختصة ولحظات تستحق الاستمتاع." },
  "Discover Our Story": { fr: "Découvrir notre histoire", ar: "اكتشف قصتنا" },
  "OUR STORY": { fr: "NOTRE HISTOIRE", ar: "قصتنا" },
  "Purpose.": { fr: "Intention.", ar: "بهدف." },
  "Crafted with": { fr: "Créé avec", ar: "صُنع بـ" },
  "Made to Be": { fr: "Fait pour être", ar: "صُنع لكي يُستمتع به" },
  "Savored.": { fr: "Savouré.", ar: "ويُذاق." },
  "Signature Selection": { fr: "Sélection signature", ar: "تشكيلة مميزة" },
  "Bakery": { fr: "Boulangerie", ar: "مخبوزات" },
  "Pastry": { fr: "Pâtisserie", ar: "حلويات" },
  "Desserts": { fr: "Desserts", ar: "حلويات" },
  "Freshly Baked": { fr: "Fraîchement cuits", ar: "مخبوزات طازجة" },
  "Signature Pastries": { fr: "Pâtisseries signature", ar: "حلوياتنا المميزة" },
  "Fine Desserts": { fr: "Desserts raffinés", ar: "حلويات راقية" },
  "Golden layers and flaky pastries, baked fresh in-house every morning.": { fr: "Des feuilletages dorés et croustillants, préparés chaque matin sur place.", ar: "طبقات ذهبية ومعجنات هشة تُخبز طازجة كل صباح في المخبز." },
  "Made slowly. Finished with intention. An elegant touch to your day.": { fr: "Préparées avec patience et soin, pour apporter une touche d’élégance à votre journée.", ar: "تُحضّر على مهل وتُقدّم بعناية لتضيف لمسة أنيقة إلى يومك." },
  "A final touch worth staying for — beautiful, seasonal, made with care.": { fr: "Une dernière douceur qui mérite de s’attarder : de saison et préparée avec soin.", ar: "لمسة أخيرة تستحق البقاء؛ جميلة وموسمية ومُحضّرة بعناية." },
  "Explore": { fr: "Découvrir", ar: "اكتشف" },
  "View Full Menu": { fr: "Voir tout le menu", ar: "عرض القائمة كاملة" },
  "Our Menu": { fr: "Notre menu", ar: "قائمتنا" },
  "Desserts Menu": { fr: "Menu des desserts", ar: "قائمة الحلويات" },
  "A sweeter side of AlArak": { fr: "La douceur signée AlArak", ar: "الجانب الأكثر حلاوة من الأراك" },
  "Cakes & Pastries": { fr: "Gâteaux et pâtisseries", ar: "كعك ومعجنات" },
  "Trompe L'Œil Desserts": { fr: "Desserts trompe-l’œil", ar: "حلويات بتصميم يخدع العين" },
  "Cookies": { fr: "Biscuits", ar: "بسكويت" },
  "Chocolate Mousse Cake": { fr: "Gâteau mousse au chocolat", ar: "كعكة موس الشوكولاتة" },
  "Carrot Cake": { fr: "Gâteau aux carottes", ar: "كعكة الجزر" },
  "Tiramisu": { fr: "Tiramisu", ar: "تيراميسو" },
  "Opera Cake": { fr: "Gâteau Opéra", ar: "كعكة أوبرا" },
  "Sacher Cake": { fr: "Gâteau Sacher", ar: "كعكة زاخَر" },
  "Pistachio Vanilla Cake": { fr: "Gâteau pistache et vanille", ar: "كعكة الفستق والفانيليا" },
  "Rocher Cake": { fr: "Gâteau Rocher", ar: "كعكة روشيه" },
  "Almond Cake": { fr: "Gâteau aux amandes", ar: "كعكة اللوز" },
  "Lemon Cheesecake": { fr: "Cheesecake au citron", ar: "تشيز كيك بالليمون" },
  "Profiteroles": { fr: "Profiteroles", ar: "بروفيتيرول" },
  "Coffee Bean Trompe L'Œil": { fr: "Trompe-l’œil grain de café", ar: "حلوى بشكل حبة قهوة" },
  "Mango Trompe L'Œil": { fr: "Trompe-l’œil mangue", ar: "حلوى بشكل مانجو" },
  "Strawberry Trompe L'Œil": { fr: "Trompe-l’œil fraise", ar: "حلوى بشكل فراولة" },
  "Chocolate Chip Cookie": { fr: "Cookie aux pépites de chocolat", ar: "كوكيز برقائق الشوكولاتة" },
  "Oat Cookies": { fr: "Biscuits à l’avoine", ar: "بسكويت الشوفان" },
  "Coconut Cookies": { fr: "Biscuits à la noix de coco", ar: "بسكويت جوز الهند" },
  "Cantucci": { fr: "Cantucci", ar: "كانتو تشيني" },
  "Matcha Cookies": { fr: "Biscuits au matcha", ar: "بسكويت الماتشا" },
  "Dark Chocolate Cookies": { fr: "Biscuits au chocolat noir", ar: "بسكويت الشوكولاتة الداكنة" },
  "Something sweet awaits": { fr: "Une douceur vous attend", ar: "حلوى لذيذة بانتظارك" },
  "Come taste it for yourself.": { fr: "Venez goûter par vous-même.", ar: "تعالوا لتتذوقوا بأنفسكم." },
  "Visit Alarak →": { fr: "Visiter Alarak →", ar: "زوروا الأراك ←" },
  "Our Gallery": { fr: "Notre galerie", ar: "معرضنا" },
  "Atmosphere & moments": { fr: "Ambiance et instants", ar: "أجواء ولحظات" },
  "Gallery photos": { fr: "Photos de la galerie", ar: "صور المعرض" },
  "Photo coming soon": { fr: "Photo à venir", ar: "الصورة قريباً" },
  "View photo": { fr: "Voir la photo", ar: "عرض الصورة" },
  "Close photo viewer": { fr: "Fermer la photo", ar: "إغلاق الصورة" },
  "Previous photo": { fr: "Photo précédente", ar: "الصورة السابقة" },
  "Next photo": { fr: "Photo suivante", ar: "الصورة التالية" },
  "The craft story": { fr: "L’histoire du savoir-faire", ar: "قصة الحرفة" },
  "Close viewer": { fr: "Fermer", ar: "إغلاق" },
  "Share your Alarak moments": { fr: "Partagez vos instants Alarak", ar: "شاركوا لحظاتكم مع الأراك" },
  "Tag ": { fr: "Identifiez-nous : ", ar: "أشيروا إلينا: " },
  "Visit & taste": { fr: "Visiter et déguster", ar: "زوروا وتذوقوا" },
  "Experience Alarak in person": { fr: "Vivez l’expérience Alarak", ar: "عِش تجربة الأراك" },
  "Daily": { fr: "Tous les jours", ar: "يومياً" },
  "Crafting Moments of Pure Warmth &": { fr: "Des instants de douceur et de", ar: "نصنع لحظات من الدفء و" },
  "Artisan Mastery in Fnideq": { fr: "L'artisanat a Fnideq", ar: "حرفية متقنة في الفنيدق" },
  "Artisan precision": { fr: "Précision artisanale", ar: "حرفية دقيقة" },
  "The Art of ": { fr: "L’art de ", ar: "فن " },
  "Slow Crafting": { fr: "prendre son temps", ar: "الصنع على مهل" },
  "Fresh pastries": { fr: "Pâtisseries fraîches", ar: "معجنات طازجة" },
  "Baked each morning in Fnideq": { fr: "Cuites chaque matin a Fnideq", ar: "تُخبز كل صباح في الفنيدق" },
  "Specialty coffee": { fr: "Café de spécialité", ar: "قهوة مختصة" },
  "Single-origin beans, carefully brewed": { fr: "Grains d’origine unique, préparés avec soin", ar: "حبوب من مصدر واحد تُحضّر بعناية" },
  "Handcrafted perfection": { fr: "La perfection artisanale", ar: "إتقان يدوي" },
  "Fresh berry tartlets, made daily": { fr: "Tartelettes aux fruits rouges, préparées chaque jour", ar: "تارت التوت الطازج، يُحضّر يومياً" },
  "The Alarak philosophy": { fr: "La philosophie Alarak", ar: "فلسفة الأراك" },
  "Warm hospitality": { fr: "Hospitalité chaleureuse", ar: "ضيافة دافئة" },
  "A welcome that feels like home": { fr: "Un accueil comme à la maison", ar: "ترحيب يشعرك بأنك في بيتك" },
  "Our vision": { fr: "Notre vision", ar: "رؤيتنا" },
  "An Elegant Refuge in ": { fr: "Un refuge élégant au", ar: "ملاذ أنيق في" },
  "the Heart of Fnideq": { fr: "au coeur de Fnideq", ar: "قلب الفنيدق" },
  "Come share a moment with us.": { fr: "Venez partager un moment avec nous.", ar: "تعالوا وشاركونا لحظة جميلة." },
  "Good coffee, thoughtful pastries, and a warm welcome in Fnideq.": { fr: "Un bon cafe, des patisseries soignees et un accueil chaleureux a Fnideq.", ar: "قهوة طيبة ومعجنات متقنة وترحيب دافئ في الفنيدق." },
  "Explore the menu": { fr: "Découvrir le menu", ar: "اكتشفوا القائمة" },
  "Visit our boutique": { fr: "Visitez notre boutique", ar: "زوروا متجرنا" },
  "Experience ALARAK In Person": { fr: "Découvrez ALARAK en personne", ar: "عِش تجربة الأراك بنفسك" },
  "Join us in Fnideq for exceptional coffee, fresh pastries, and an atmosphere designed for relaxation.": { fr: "Retrouvez-nous a Fnideq pour un cafe d'exception, des patisseries fraiches et une atmosphere propice a la detente.", ar: "زورونا في الفنيدق لقهوة مميزة ومعجنات طازجة وأجواء مريحة." },
  "Location": { fr: "Adresse", ar: "الموقع" },
  "Fnideq": { fr: "Fnideq", ar: "الفنيدق" },
  "Morocco": { fr: "Maroc", ar: "المغرب" },
  "Opening Hours": { fr: "Horaires", ar: "ساعات العمل" },
  "Monday – Sunday": { fr: "Lundi – dimanche", ar: "الإثنين – الأحد" },
  "Contact": { fr: "Contact", ar: "اتصلوا بنا" },
  "Our Location": { fr: "Notre adresse", ar: "موقعنا" },
  "Phone": { fr: "Téléphone", ar: "الهاتف" },
  "Come by,": { fr: "Passez nous voir,", ar: "زورونا،" },
  "stay awhile.": { fr: "prenez le temps.", ar: "وأمضوا وقتاً جميلاً." },
  "We'd love to welcome you to Alarak. Enjoy our coffee, fresh pastries and handcrafted cakes in a warm and relaxed atmosphere.": { fr: "Nous serons ravis de vous accueillir chez Alarak. Savourez notre café, nos pâtisseries fraîches et nos gâteaux artisanaux dans une ambiance chaleureuse et détendue.", ar: "يسعدنا استقبالكم في الأراك. استمتعوا بقهوتنا ومعجناتنا الطازجة وكعكاتنا المصنوعة يدوياً في أجواء دافئة ومريحة." },
  "Get Directions": { fr: "Itinéraire", ar: "الاتجاهات" },
  "Contact Us": { fr: "Contactez-nous", ar: "تواصلوا معنا" },
  "Fnideq, Morocco": { fr: "Fnideq, Maroc", ar: "الفنيدق، المغرب" },
  "Send a message": { fr: "Envoyer un message", ar: "أرسل رسالة" },
  "Have a question? Send us a note and we'll get back to you.": { fr: "Une question ? Écrivez-nous, nous vous répondrons.", ar: "لديك سؤال؟ أرسل لنا رسالة وسنعاود التواصل معك." },
  "Your email address": { fr: "Votre adresse e-mail", ar: "بريدك الإلكتروني" },
  "Write your message...": { fr: "Écrivez votre message…", ar: "اكتب رسالتك..." },
  "Send message": { fr: "Envoyer le message", ar: "إرسال الرسالة" },
  "Your email app will open with the message ready to send.": { fr: "Votre application e-mail s’ouvrira avec le message prêt à être envoyé.", ar: "سيفتح تطبيق البريد الإلكتروني والرسالة جاهزة للإرسال." },
  "Follow": { fr: "Suivre", ar: "تابعونا" },
  "Instagram": { fr: "Instagram", ar: "إنستغرام" },
  "Reservations via Instagram": { fr: "Réservations sur Instagram", ar: "الحجوزات عبر إنستغرام" },
  "Back to top": { fr: "Retour en haut", ar: "العودة إلى الأعلى" },
  "Follow Alarak on Instagram": { fr: "Suivre Alarak sur Instagram", ar: "تابعوا الأراك على إنستغرام" },
  "Follow Alarak on Facebook": { fr: "Suivre Alarak sur Facebook", ar: "تابعوا الأراك على فيسبوك" },
  "Follow Alarak on TikTok": { fr: "Suivre Alarak sur TikTok", ar: "تابعوا الأراك على تيك توك" },
  "Follow Alarak on YouTube": { fr: "Suivre Alarak sur YouTube", ar: "تابعوا الأراك على يوتيوب" },

  "Alarak Founder & Master Artisan": { fr: "Fondateur et ma?tre artisan Alarak", ar: "مؤسس الأراك وحرفي ماهر" },
  "ALARAK was born from a deep love of craft ? where the art of specialty coffee meets the warmth of Moroccan hospitality. Every cup is brewed with intention, every pastry shaped by the hands of artisans who believe that food is a form of care.": { fr: "ALARAK est n? d?un profond amour du savoir-faire, l? o? le caf? de sp?cialit? rencontre la chaleur de l?hospitalit? marocaine. Chaque tasse est pr?par?e avec intention et chaque p?tisserie fa?onn?e par des artisans passionn?s.", ar: "وُلد الأراك من حب عميق للحرفة، حيث تلتقي القهوة المختصة بدفء الضيافة المغربية. نحضّر كل كوب بعناية ونصنع كل معجنة بيد حرفية." },
  "We create spaces and flavors that invite you to slow down, to savor, and to feel genuinely welcomed. This is not just a caf? ? it is a moment worth returning to.": { fr: "Nous cr?ons des lieux et des saveurs qui invitent ? ralentir, ? savourer et ? se sentir accueilli. Plus qu?un caf?, c?est un moment auquel on aime revenir.", ar: "نبتكر مساحات ونكهات تدعوك للهدوء والتذوق والشعور بالترحيب. ليس مقهى فحسب، بل لحظة تستحق العودة." },
  "Coffee and pastry are not simply served ? they are shared moments of genuine warmth.": { fr: "Le caf? et les p?tisseries ne se servent pas seulement : ils se partagent dans un moment de chaleur sinc?re.", ar: "ليست القهوة والمعجنات مجرد طعام وشراب، بل لحظات دافئة نتشاركها." },
  "A visual journey through artisanal craft, warm ambience, and specialty coffee in Fnideq. Every corner is made for slowing down and savoring the moment.": { fr: "Un voyage au coeur du savoir-faire artisanal, d?une ambiance chaleureuse et du cafe de specialite a Fnideq. Chaque recoin invite a savourer l?instant.", ar: "رحلة بصرية بين الحرفة الأصيلة والأجواء الدافئة والقهوة المختصة في الفنيدق." },
  "Dessert categories": { fr: "Cat?gories de desserts", ar: "أصناف الحلويات" },
  "View on Maps": { fr: "Voir sur la carte", ar: "عرض على الخريطة" },
  "Open Fnideq on Google Maps": { fr: "Ouvrir Fnideq dans Google Maps", ar: "افتح الفنيدق على خرائط جوجل" },
  "Whether you're stopping in for your morning coffee or meeting friends over something sweet, we hope each visit becomes a small ritual worth returning to.": { fr: "Que vous passiez pour votre caf? du matin ou retrouviez des amis autour d?une douceur, nous esp?rons que chaque visite deviendra un rituel auquel revenir.", ar: "سواء مررتم لقهوة الصباح أو للقاء الأصدقاء مع حلوى، نأمل أن تصبح كل زيارة عادة جميلة تعودون إليها." },
  "Specialty coffee and artisan pastry, made slowly in Fnideq — a warm place to pause, savor, and return to.": { fr: "Cafe de specialite et patisseries artisanales prepares avec soin a Fnideq, dans un lieu chaleureux ou faire une pause et savourer l?instant.", ar: "قهوة مختصة ومعجنات يدوية تُحضّر بعناية في الفنيدق، في مكان دافئ للاستراحة والتذوق." },
  "Find us in Fnideq for specialty coffee, freshly baked pastries, and a warm place to pause.": { fr: "Retrouvez-nous a Fnideq pour un cafe de specialite, des patisseries fraiches et une pause chaleureuse.", ar: "تفضلوا بزيارتنا في الفنيدق للاستمتاع بالقهوة المختصة والمعجنات الطازجة في أجواء دافئة." },
};

Object.assign(translations, {
  "Explore our": { fr: "Découvrir notre", ar: "اكتشف" },
  "Explore": { fr: "Découvrir", ar: "اكتشف" },
  "Our Selection": { fr: "Notre sélection", ar: "تشكيلتنا" },
  "From carefully crafted coffee to freshly baked creations, every detail is made to turn an everyday moment into something memorable.": {
    fr: "Du café préparé avec soin aux créations fraîchement sorties du four, chaque détail transforme un instant ordinaire en souvenir précieux.",
    ar: "من القهوة المحضّرة بعناية إلى المخبوزات الطازجة، صُمّم كل تفصيل ليحوّل لحظاتكم اليومية إلى ذكرى مميزة.",
  },
  "At Alarak, every pastry tells a story of dedication, precision, and refined flavor. Our pastry chefs prepare each signature tartlet with fresh berries, delicate custard, and carefully finished chocolate.": {
    fr: "Chez Alarak, chaque pâtisserie raconte une histoire de passion, de précision et de saveurs raffinées. Nos chefs préparent chaque tartelette signature avec des fruits frais, une crème délicate et du chocolat soigneusement travaillé.",
    ar: "في الأراك، تحكي كل قطعة حلوى قصة شغف ودقة ونكهة راقية. يحضّر حلوانيونا تارتاتنا المميزة بالفواكه الطازجة والكاسترد الناعم والشوكولاتة المصقولة بعناية.",
  },
  "Paired with thoughtfully selected specialty coffee, every detail reflects our love of good ingredients and careful craft.": {
    fr: "Accompagné d’un café de spécialité soigneusement sélectionné, chaque détail reflète notre amour des bons ingrédients et du savoir-faire artisanal.",
    ar: "ومع قهوة مختصة مختارة بعناية، يعكس كل تفصيل حبّنا للمكونات الجيدة والحرفة المتقنة.",
  },
  "Visit our location": { fr: "Visiter notre adresse", ar: "زوروا موقعنا" },
  "Tag us at": { fr: "Identifiez-nous sur", ar: "أشيروا إلينا على" },
  "on Instagram to be featured in our community gallery.": { fr: "sur Instagram pour apparaître dans notre galerie.", ar: "على إنستغرام لتظهروا في معرض مجتمعنا." },
  "Your message": { fr: "Votre message", ar: "رسالتك" },
  "Sending...": { fr: "Envoi en cours…", ar: "جارٍ الإرسال…" },
  "Your message has been sent. Thank you!": { fr: "Votre message a bien été envoyé. Merci !", ar: "تم إرسال رسالتك بنجاح، شكراً لك!" },
  "Your message will be sent directly to our team.": { fr: "Votre message sera envoyé directement à notre équipe.", ar: "ستُرسل رسالتك مباشرة إلى فريقنا." },
  "We could not send your message. Please try again.": { fr: "Nous n’avons pas pu envoyer votre message. Veuillez réessayer.", ar: "تعذّر إرسال رسالتك. يُرجى المحاولة مجدداً." },
  "Have a question? Send us a note and we'll get back to you.": { fr: "Une question ? Écrivez-nous et nous vous répondrons.", ar: "لديك سؤال؟ أرسل لنا رسالة وسنعاود التواصل معك." },
  "Leave this field empty": { fr: "Laissez ce champ vide", ar: "اترك هذا الحقل فارغاً" },
  "Footer navigation": { fr: "Navigation de pied de page", ar: "روابط أسفل الصفحة" },
  "Legal links": { fr: "Liens juridiques", ar: "روابط قانونية" },
  "Social media links": { fr: "Réseaux sociaux", ar: "روابط التواصل الاجتماعي" },
  "Chat with us on WhatsApp": { fr: "Contactez-nous sur WhatsApp", ar: "تواصلوا معنا عبر واتساب" },
  "Alarak Founder & Master Artisan": { fr: "Fondateur et maître artisan d’Alarak", ar: "مؤسس الأراك وحرفي ماهر" },
  "Alarak artisan berry tartlet, prepared with care": { fr: "Tartelette artisanale aux fruits rouges préparée avec soin", ar: "تارت التوت الحرفي المحضّر بعناية" },
  "Alarak founder welcoming guests": { fr: "Le fondateur d’Alarak accueille ses invités", ar: "مؤسس الأراك يرحّب بالضيوف" },
  "Alarak Coffee & Bakery – Coming Soon": { fr: "Alarak Coffee & Bakery — bientôt", ar: "الأراك للقهوة والمخبوزات — قريباً" },
  "Pistachio vanilla cake on a ceramic plate": { fr: "Gâteau pistache et vanille sur une assiette en céramique", ar: "كعكة بالفستق والفانيليا على طبق خزفي" },
  "Lemon cheesecake slice": { fr: "Part de cheesecake au citron", ar: "قطعة تشيز كيك بالليمون" },
  "Chocolate mousse cake slice": { fr: "Part de gâteau mousse au chocolat", ar: "قطعة كعكة موس الشوكولاتة" },
  "Coffee bean, mango, and strawberry trompe l'œil desserts": { fr: "Desserts trompe-l’œil en forme de grain de café, de mangue et de fraise", ar: "حلويات بتصميم يخدع العين على شكل حبة قهوة ومانجو وفراولة" },
  "Artisan chocolate chip cookies": { fr: "Cookies artisanaux aux pépites de chocolat", ar: "بسكويت حرفي برقائق الشوكولاتة" },
  "Alarak Freshly Baked Pastry": { fr: "Pâtisserie fraîchement préparée chez Alarak", ar: "مخبوزات طازجة من الأراك" },
  "Alarak Signature Pastry": { fr: "Pâtisserie signature d’Alarak", ar: "حلوى الأراك المميزة" },
  "Alarak Fine Dessert": { fr: "Dessert raffiné d’Alarak", ar: "حلوى راقية من الأراك" },
  "Artisan hands preparing fresh pastries on a warm wooden surface": { fr: "Mains d’artisans préparant des pâtisseries fraîches sur un plan de travail en bois", ar: "أيدٍ حرفية تحضّر مخبوزات طازجة على سطح خشبي دافئ" },
  "Specialty latte and artisan pastries beautifully arranged on a café table": { fr: "Latte de spécialité et pâtisseries artisanales joliment disposés sur une table de café", ar: "قهوة لاتيه مختصة ومخبوزات حرفية مرتبة بعناية على طاولة المقهى" },
  "Precision espresso extraction pouring into an Alarak branded cup": { fr: "Extraction précise d’un espresso dans une tasse Alarak", ar: "استخلاص إسبريسو بدقة في فنجان يحمل علامة الأراك" },
  "Exquisite selection of artisan pastries and Moroccan bakery specialties": { fr: "Sélection raffinée de pâtisseries artisanales et de spécialités boulangères marocaines", ar: "تشكيلة فاخرة من الحلويات الحرفية والمخبوزات المغربية المميزة" },
  "Privacy": { fr: "Confidentialité", ar: "الخصوصية" },
  "Terms": { fr: "Conditions générales", ar: "الشروط والأحكام" },
  "All rights reserved.": { fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة." },
  "© 2026 Alarak Coffee & Bakery": { fr: "© 2026 Alarak Coffee & Bakery", ar: "© 2026 الأراك للقهوة والمخبوزات" },
  "Good Coffee • Great Moments": { fr: "Un bon café • De beaux moments", ar: "قهوة طيبة • لحظات جميلة" },
  "Craft & heartfelt hospitality": { fr: "Savoir-faire et accueil chaleureux", ar: "حرفة أصيلة وضيافة دافئة" },
  "Coffee and pastry are not simply served — they are shared moments of genuine warmth.": {
    fr: "Le café et les pâtisseries ne se servent pas seulement : ils se partagent dans un moment de chaleur sincère.",
    ar: "ليست القهوة والمعجنات مجرد طعام وشراب، بل لحظات دافئة نتشاركها.",
  },
  "08:00 AM – 10:00 PM": { fr: "08 h 00 – 22 h 00", ar: "08:00 – 22:00" },
  "08:00 – 22:00": { fr: "08 h 00 – 22 h 00", ar: "08:00 – 22:00" },
  "Join us in Fnideq for exceptional coffee, fresh pastries, and an atmosphere designed for relaxation.": {
    fr: "Retrouvez-nous à Fnideq pour un café d’exception, des pâtisseries fraîches et une atmosphère propice à la détente.",
    ar: "زورونا في الفنيدق لتستمتعوا بقهوة مميزة ومخبوزات طازجة وأجواء تدعو للاسترخاء.",
  },
  "Specialty coffee and artisan pastry, made slowly in Fnideq — a warm place to pause, savor, and return to.": {
    fr: "Café de spécialité et pâtisseries artisanales préparés avec soin à Fnideq, dans un lieu chaleureux où faire une pause et savourer l’instant.",
    ar: "قهوة مختصة وحلويات يدوية تُحضّر بعناية في الفنيدق، في مكان دافئ للاستراحة والتذوق والعودة إليه.",
  },
  "All": { fr: "Tout", ar: "الكل" },
  "Artisan Coffee": { fr: "Café artisanal", ar: "قهوة حرفية" },
  "Fresh Bakery": { fr: "Boulangerie fraîche", ar: "مخبوزات طازجة" },
  "Interior & Vibe": { fr: "Lieu et ambiance", ar: "المكان والأجواء" },
  "Barista Craft": { fr: "Savoir-faire barista", ar: "إبداع الباريستا" },
  "Signature Pour-Over Precision": { fr: "La précision du café filtre signature", ar: "دقة تحضير القهوة المقطّرة المميزة" },
  "Handcrafted single-origin pour-over coffee brewed with meticulous attention to temperature and grind precision.": { fr: "Un café filtre d’origine unique, préparé à la main avec une attention précise à la température et à la mouture.", ar: "قهوة مقطرة يدوياً من مصدر واحد، تُحضّر بعناية لضبط الحرارة ودرجة الطحن." },
  "Sourced directly from high-altitude Ethiopian farms, our bloom time is timed to the second to unlock delicate floral and bergamot notes.": { fr: "Nos grains viennent de fermes éthiopiennes d’altitude. Une infusion précisément minutée révèle leurs notes florales et de bergamote.", ar: "نختار حبوبنا من مزارع إثيوبية مرتفعة، ونضبط وقت التخمير بدقة لإبراز نكهات الأزهار والبرغموت." },
  "Golden Flake Croissant": { fr: "Croissant doré et feuilleté", ar: "كرواسون ذهبي مورّق" },
  "Freshly baked daily using Normandy butter for 72-hour fermented laminated perfection.": { fr: "Cuit chaque jour au beurre normand, avec une pâte feuilletée fermentée pendant 72 heures.", ar: "يُخبز يومياً بزبدة نورماندي وعجين مورّق مُخمّر لمدة 72 ساعة." },
  "Our master baker begins at 4:00 AM every morning ensuring that classic, shattered-glass crunch on the first bite.": { fr: "Chaque matin dès 4 h, notre chef boulanger prépare ce feuilletage au croustillant incomparable.", ar: "يبدأ خبازنا المحترف عمله يومياً عند الرابعة صباحاً ليمنحكم قرمشة مورّقة من أول لقمة." },
  "Sanctuary of Warmth & Quiet": { fr: "Un refuge de calme et de douceur", ar: "مساحة للدفء والهدوء" },
  "Thoughtfully designed space blending modern Moroccan architecture with warm brass and oak accents.": { fr: "Un espace soigneusement conçu, entre architecture marocaine contemporaine, laiton chaleureux et touches de chêne.", ar: "مساحة مصممة بعناية تجمع العمارة المغربية العصرية بلمسات من النحاس الدافئ وخشب البلوط." },
  "Architecturally crafted to evoke a sense of calm in the heart of Fnideq, offering cozy alcoves and natural sunlight.": { fr: "Au cœur de Fnideq, des alcôves accueillantes et une lumière naturelle créent une atmosphère apaisante.", ar: "في قلب الفنيدق، تمنح الزوايا المريحة والضوء الطبيعي المكان أجواءً هادئة." },
  "Velvet Espresso & Latte Art": { fr: "Espresso velouté et art latte", ar: "إسبريسو مخملي وفن اللاتيه" },
  "Silky microfoam etched with precision over our dark chocolate & hazelnut house espresso blend.": { fr: "Une mousse de lait soyeuse et précise sur notre espresso maison aux notes de chocolat noir et de noisette.", ar: "رغوة حليب ناعمة مرسومة بإتقان فوق إسبريسو الدار بنكهة الشوكولاتة الداكنة والبندق." },
  "Every cup is poured with artistic pride by our senior baristas who train in sensory calibration weekly.": { fr: "Nos baristas expérimentés réalisent chaque tasse avec soin et affinent leurs dégustations chaque semaine.", ar: "يُحضّر خبراء القهوة كل فنجان بإبداع، ويطوّرون حاسة التذوق لديهم أسبوعياً." },
  "Artisan Sourdough & Pastry Display": { fr: "Pain au levain et vitrine de pâtisseries", ar: "خبز العجين المخمّر وتشكيلة المخبوزات" },
  "A daily selection of rustic sourdough loaves, cardamom knots, and seasonal tartlets.": { fr: "Chaque jour, découvrez nos pains au levain, roulés à la cardamome et tartelettes de saison.", ar: "تشكيلة يومية من خبز العجين المخمّر ولفائف الهيل وتارتات الموسم." },
  "Made with wild sourdough starter nurtured in Fnideq since Alarak opened its doors.": { fr: "Notre levain naturel est entretenu à Fnideq depuis l’ouverture d’Alarak.", ar: "نعتني بخميرة العجين الطبيعية في الفنيدق منذ افتتاح الأراك." },
  "Evening Glow at Alarak": { fr: "La lumière du soir chez Alarak", ar: "أجواء الأراك المسائية" },
  "As dusk falls, ambient warm lighting transforms the cafe into an intimate evening retreat.": { fr: "À la tombée du jour, une lumière douce transforme le café en un refuge intime.", ar: "مع حلول المساء، تحوّل الإضاءة الدافئة المقهى إلى مساحة هادئة وحميمة." },
  "Custom dimmable lighting and curated lounge acoustics create the perfect ambiance for evening conversations.": { fr: "Un éclairage réglable et une ambiance sonore soignée accompagnent vos conversations du soir.", ar: "تمنح الإضاءة القابلة للتعديل والأجواء الصوتية الهادئة أمسياتكم طابعاً مثالياً للحديث." },
  "Cold Brew Infusion Tower": { fr: "Tour d’infusion de café à froid", ar: "برج استخلاص القهوة الباردة" },
  "Slow 18-hour Dutch cold drip extraction producing smooth, low-acidity elixir with notes of plum.": { fr: "Une extraction lente de 18 heures, douce et peu acidulée, aux notes de prune.", ar: "استخلاص بارد هولندي بطيء لمدة 18 ساعة، بمذاق ناعم وحموضة خفيفة ونفحات البرقوق." },
  "Extracted drop-by-drop over 18 hours to preserve volatile aromatic compounds without bitterness.": { fr: "Extrait goutte à goutte pendant 18 heures pour préserver ses arômes sans amertume.", ar: "يُستخلص قطرة قطرة على مدى 18 ساعة للحفاظ على عبيره دون مرارة." },
  "Pistachio Paris-Brest": { fr: "Paris-Brest à la pistache", ar: "باريس بريست بالفستق" },
  "Choux pastry ring filled with roasted Sicilian pistachio praline cream and dusted with icing sugar.": { fr: "Une couronne de pâte à choux garnie de praliné à la pistache sicilienne et saupoudrée de sucre glace.", ar: "حلقة من عجينة الشو محشوة بكريمة برالين الفستق الصقلي ومزيّنة بالسكر الناعم." },
  "Our signature homage to classical French patisserie elevated with premium Mediterranean ingredients.": { fr: "Notre hommage à la pâtisserie française classique, sublimé par des ingrédients méditerranéens de qualité.", ar: "تحية من الأراك للحلويات الفرنسية التقليدية، بمكونات متوسطية فاخرة." },
  "Barista Grind Calibration": { fr: "Réglage précis de la mouture", ar: "ضبط طحن القهوة باحتراف" },
  "Dialing in the espresso grind multiple times a day to adapt to humidity and temperature changes.": { fr: "Nous ajustons la mouture de l’espresso plusieurs fois par jour selon l’humidité et la température.", ar: "نضبط درجة طحن الإسبريسو مرات عدة يومياً وفق تغيرات الرطوبة والحرارة." },
  "Consistency is our obsessive standard. Humidity in Fnideq shifts daily, and our grind size adjusts in microns.": { fr: "La régularité est notre exigence : à Fnideq, nous adaptons la mouture au micron près aux variations quotidiennes.", ar: "الثبات معيارنا الدقيق؛ تتغير الرطوبة في الفنيدق يومياً، لذلك نعدّل الطحن بأجزاء دقيقة." },
  "View the menu PDF in a new tab": { fr: "Voir le menu PDF dans un nouvel onglet", ar: "عرض قائمة الطعام بصيغة PDF في علامة تبويب جديدة" },
  "Mediterranean Sea": { fr: "Mer Méditerranée", ar: "البحر الأبيض المتوسط" },
  "Coming Soon": { fr: "Bientôt", ar: "قريباً" },
  "Monday – Sunday": { fr: "Du lundi au dimanche", ar: "من الاثنين إلى الأحد" },
  "Come by,": { fr: "Passez nous voir,", ar: "زورونا،" },
  "Coffee is not just a drink; it’s an invitation to slow down, connect, and savor the finest moments in life.": {
    fr: "Le café n’est pas qu’une boisson : c’est une invitation à ralentir, à se retrouver et à savourer les plus beaux moments de la vie.",
    ar: "القهوة ليست مجرد مشروب؛ إنها دعوة للتمهّل والتواصل والاستمتاع بأجمل لحظات الحياة.",
  },
  "CHAPTER I: ARTISANAL CRAFT": { fr: "CHAPITRE I : SAVOIR-FAIRE ARTISANAL", ar: "الفصل الأول: حرفة أصيلة" },
  "CHAPTER II: COFFEE & PASTRY": { fr: "CHAPITRE II : CAFÉ ET PÂTISSERIE", ar: "الفصل الثاني: القهوة والحلويات" },
  "CHAPTER III: COFFEE EXTRACTION": { fr: "CHAPITRE III : EXTRACTION DU CAFÉ", ar: "الفصل الثالث: استخلاص القهوة" },
  "CHAPTER IV: BAKERY TREASURES": { fr: "CHAPITRE IV : TRÉSORS DE BOULANGERIE", ar: "الفصل الرابع: كنوز المخبوزات" },
  "ALARAK was born from a deep love of craft — where the art of specialty coffee meets the warmth of Moroccan hospitality. Every cup is brewed with intention, every pastry shaped by the hands of artisans who believe that food is a form of care.": {
    fr: "ALARAK est né d’un profond amour du savoir-faire, là où l’art du café de spécialité rencontre la chaleur de l’hospitalité marocaine. Chaque tasse est préparée avec intention et chaque pâtisserie façonnée par des artisans passionnés.",
    ar: "وُلد الأراك من حب عميق للحرفة، حيث يلتقي فن القهوة المختصة بدفء الضيافة المغربية. نحضّر كل فنجان بعناية ونصنع كل حلوى بأيدي حرفيين يؤمنون بأن الطعام شكل من أشكال العناية.",
  },
  "We create spaces and flavors that invite you to slow down, to savor, and to feel genuinely welcomed. This is not just a café — it is a moment worth returning to.": {
    fr: "Nous créons des lieux et des saveurs qui invitent à ralentir, à savourer et à se sentir chaleureusement accueilli. Plus qu’un café, c’est un instant auquel on aime revenir.",
    ar: "نبتكر أماكن ونكهات تدعوك للهدوء والتذوق والشعور بحفاوة الترحيب. ليس مجرد مقهى، بل لحظة تستحق أن نعود إليها.",
  },
  "ALARAK brings contemporary elegance together with the warmth of Moroccan hospitality, creating a welcoming place for coffee lovers and pastry enthusiasts.": {
    fr: "ALARAK unit l’élégance contemporaine à la chaleur de l’hospitalité marocaine pour accueillir les passionnés de café et de pâtisserie.",
    ar: "يجمع الأراك بين الأناقة العصرية ودفء الضيافة المغربية، ليكون مكاناً مرحباً بعشاق القهوة والحلويات.",
  },
  "Whether you’re stopping in for your morning coffee or meeting friends over something sweet, we hope each visit becomes a small ritual worth returning to.": {
    fr: "Que vous passiez pour votre café du matin ou retrouviez des amis autour d’une douceur, nous espérons que chaque visite deviendra un rituel auquel revenir.",
    ar: "سواء مررتم لتناول قهوة الصباح أو للقاء الأصدقاء مع حلوى لذيذة، نأمل أن تصبح كل زيارة عادة جميلة تستحق التكرار.",
  },
});

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("alarak-language", nextLanguage);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("alarak-language");
    if (saved === "fr" || saved === "ar" || saved === "en") setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = useCallback(
    (text: string) => (language === "en" ? text : translations[text]?.[language] ?? text),
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
