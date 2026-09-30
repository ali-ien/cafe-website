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
