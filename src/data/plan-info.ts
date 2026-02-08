/**
 * Información del plan nutricional por alimento, extraída de los PDFs
 * de la Lic. Melissa Magalde Medina.
 */

export interface PlanInfo {
  carlos?: string;
  johana?: string;
  notes?: string;
  cooking?: string;
}

export const planInfo: Record<string, PlanInfo> = {
  // ═══════════════════════════════════════════
  // DESAYUNOS
  // ═══════════════════════════════════════════
  b1: {
    carlos: '1 huevo, 2 claras con 2 cdas de Tregar blanco light, 2 fetas de pavita y 30g de queso port salut light Tregar o Serenísima.',
    johana: '1 huevo, 2 claras con 2 cdas de Tregar blanco light y 2 fetas de pavita.',
    notes: 'Aporta ~28-35g de proteína.',
    cooking: 'Batir huevo y claras. Humedecer sartén con ghee o aceite de coco (servilleta). Cocinar a fuego medio, agregar Tregar, pavita y queso. Doblar y servir. Acompañar con espinacas, champiñones, tomates cherry o cebollas salteadas.',
  },
  b2: {
    johana: '4 claras, 2 cdas de Tregar blanco light, 2 de pavita y ¼ palta.',
    notes: 'Solo Johana. Aporta ~28g de proteína y 5g de grasas.',
  },
  b3: {
    johana: '2 claras, 2 jamón o pavita, 2 cdas de Tregar y 30g de queso port salut light Tregar o Serenísima.',
    notes: 'Solo Johana. Aporta ~28g de proteína.',
  },
  b4: {
    johana: 'ICED PROTEIN COFFEE: ½ taza de leche de almendras o Protein 0% con 1 medida de whey, hielo, stevia a gusto.',
    notes: 'Solo Johana. Opción "to go".',
  },
  b5: {
    johana: 'Iced protein coffee: ½ medida de whey con agua, hielo, stevia, y 1 barrita low carb o low sugar.',
    notes: 'Solo Johana.',
  },
  b6: {
    carlos: '100g de yogurt Kay griego con 1 medida de whey, 2 cdas de semillas mix, 1 cdta de mantequilla de maní y Mr Taste 0 calorías.',
    johana: '100g de yogurt Kay griego con ¾ medida de whey, 2 cdas de semillas mix, 1 cdta de mantequilla de maní y Mr Taste 0 calorías.',
    cooking: 'Mezclar yogurt Kay griego con whey protein hasta integrar. Agregar semillas mix, mantequilla de maní y salsa Mr Taste 0 calorías del gusto que prefieras.',
  },
  b7: {
    carlos: 'Batir 1 huevo, 2 claras con ½ medida de whey, vainilla, stevia. Topping Mr Taste 0 calorías. Evitar miel. Y 2 cdas de Tregar blanco light.',
    johana: 'Batir 1 huevo, 1 clara con ½ medida de whey, vainilla, stevia. Topping Mr Taste 0 calorías. Evitar miel. Y 1 cda de Tregar blanco light.',
    cooking: 'Batir huevo + claras con whey, vainilla y stevia hasta lograr mezcla homogénea. Cocinar en sartén antiadherente (humedecer con ghee) a fuego medio-bajo. Voltear cuando se formen burbujas. Servir con Mr Taste 0 calorías y Tregar blanco light. NO usar miel.',
  },
  b8: {
    carlos: 'Procesar 1 huevo, 2 claras, 2 cdas de Tregar blanco light, 2 min y 30 seg al microondas. Rellenar con 2 fetas de pavita, champiñones, tomates, espinacas. Y 2 cdas de Tregar.',
    johana: 'Procesar 1 huevo, 2 claras, 2 cdas de Tregar blanco light, 2 min y 30 seg al microondas. Rellenar con 2 fetas de pavita, champiñones, tomates, espinacas.',
    cooking: 'Procesar 1 huevo + 2 claras + 2 cdas Tregar en licuadora o procesadora. Verter en taza/recipiente apto para microondas. Cocinar 2 min 30 seg. Desmoldar y rellenar como sándwich con pavita, champiñones, tomates y espinacas.',
  },
  b9: {
    carlos: '1 bolillo keto meli o pan lactal 1 reb keto, con 1 huevo, 2 cdas de Tregar blanco light, 2 fetas de pavita, 2 claras revueltas.',
    johana: '1 bolillo keto meli, con 1 cda de Tregar blanco light, 2 fetas de pavita, 2 claras revueltas.',
  },
  b10: {
    carlos: '1 reb de pan lactal keto meli con 1 huevo, 2 claras, 2 fetas de jamón o pavita, 30g de queso crema.',
    johana: '1 reb de pan keto lactal meli, con 2 claras revueltas, espinacas, champiñones, 30g de queso port salut light Tregar y 2 fetas de pavita.',
  },
  b11: {
    johana: '1 reb de pan keto lactal meli con 4 claras y 2 cdas de Tregar blanco light.',
    notes: 'Solo Johana.',
  },
  bc5: {
    carlos: '1 reb de pan lactal keto meli con 1 huevo, 2 claras, 2 fetas de jamón o pavita, 30g de queso crema.',
    notes: 'Solo Carlos.',
  },

  // ═══════════════════════════════════════════
  // PROTEÍNAS (ALMUERZO / CENA)
  // ═══════════════════════════════════════════
  p1: {
    carlos: '180g de pescados blancos (merluza, brotola, lenguado, pollo de mar). Todo cocido.',
    johana: '150g de pescados blancos (merluza, brotola, lenguado, pollo de mar). Todo cocido.',
    notes: 'Proteína regular. Almuerzo: + vegetales libres. Cena: + vegetales + 1 carbo.',
    cooking: 'Cocinar al horno, parrilla, grill, plancha o hervido. NO freír. Para cocinar humedecer servilleta con ghee o aceite de coco y pasarla por la sartén. Aderezar con limón, vinagre de manzana, aceto balsámico, mostaza Heinz, sal, pimienta o hierbas.',
  },
  p2: {
    carlos: '180g de mariscos cocidos (mejillones, camarones, langostinos, calamares).',
    johana: '150g de mariscos cocidos (mejillones, camarones, langostinos, calamares).',
    notes: 'Proteína regular.',
  },
  p3: {
    carlos: '1 lata de lomito de atún al agua (120g) con 1 huevo y 2 claras.',
    johana: '1 lata de lomito de atún al agua y 2 claras.',
    notes: 'Proteína regular.',
  },
  p4: {
    carlos: 'Suprema de pollo 180g cocida.',
    johana: 'Suprema de pollo 150g cocida.',
    notes: 'Proteína regular. Comer pechuga, no pata muslo ni alas. Eliminar piel.',
    cooking: 'Solo pechuga (suprema), eliminar piel. Cocinar al horno, parrilla, plancha, grill o en salsa de tomate natural. NO freír ni rebozar. Humedecer sartén con ghee. Acompañar con vegetales libres.',
  },
  p5: {
    carlos: 'Lomo de res 180g cocido.',
    johana: 'Lomo de res 150g cocido.',
    notes: 'Proteína regular. Eliminar grasa visible.',
    cooking: 'Eliminar toda grasa visible. Cocinar al horno, parrilla, plancha o grill. NO freír. Humedecer sartén con ghee o aceite de coco.',
  },
  p6: {
    carlos: '60g de burrata o bocconcini con 4 claras duras cocidas.',
    johana: '60g de burrata o bocconcini con 6 claras duras cocidas.',
    notes: 'Proteína regular.',
  },
  p7: {
    carlos: 'Soufflé de 1 huevo, 4 claras con 60g de ricotta magra.',
    johana: 'Soufflé de 4 claras con 60g de ricotta magra.',
    notes: 'Proteína regular.',
  },
  p8: {
    johana: '1 huevo, 4 claras, y 2 fetas de jamón o pavita y 2 cdas de Tregar blanco light.',
    notes: 'Solo Johana. Proteína regular.',
  },
  p9: {
    johana: '1 pan nube de jamón y queso de Café Martínez o de Starbucks.',
    notes: 'Solo Johana. Proteína regular.',
  },
  p10: {
    johana: 'Ceviche 150g.',
    notes: 'Solo Johana. Proteína regular.',
  },
  p11: {
    carlos: '2 empanadas keto de pollo o carne meli.',
    notes: 'Solo Carlos. Proteína regular.',
  },
  p12: {
    carlos: '½ porción de pizza keto meli.',
    notes: 'Solo Carlos. Proteína regular.',
  },
  p13: {
    carlos: '1 pan de hamburguesa keto meli con 1 hamburguesa de pollo, y vegetales que quieras.',
    notes: 'Solo Carlos. Proteína regular.',
  },
  p14: {
    carlos: '180g de salmón, trucha o atún rojo. Proteína semigrasa: máx 1 vez/semana sin aceites.',
    johana: '150g de salmón, trucha o atún rojo. Proteína semigrasa: máx 2 veces/semana.',
    notes: '⚠️ Semigrasa: limitar frecuencia semanal.',
  },
  p15: {
    carlos: 'Lomo, nalga o peceto 180g. Proteína semigrasa: máx 1 vez/semana sin aceites.',
    johana: 'Lomo, nalga o peceto 150g. Proteína semigrasa: máx 2 veces/semana.',
    notes: '⚠️ Semigrasa: limitar frecuencia semanal.',
  },
  p16: {
    carlos: '12 rolls de sushi envueltos en tamago (Phell y Placer). Máx 1 vez/semana.',
    johana: '10 rolls de sushi envueltos en tamago. Máx 2 veces/semana.',
    notes: '⚠️ Semigrasa.',
  },
  p17: {
    carlos: '12 sashimi. Proteína semigrasa: máx 1 vez/semana.',
    johana: '10 sashimi. Proteína semigrasa: máx 2 veces/semana.',
    notes: '⚠️ Semigrasa.',
  },

  // ═══════════════════════════════════════════
  // SNACKS / MERIENDAS CARLOS
  // ═══════════════════════════════════════════
  sc1: {
    carlos: '1 helado Frosz proteico cualquier gusto.',
    johana: '1 helado Frosz proteico cualquier gusto.',
    notes: 'Proteico. 21-28g de proteína (Carlos), 14-21g (Johana postre).',
  },
  sc2: {
    carlos: '1 postre proteico Meli (pancakes 6, o 1 tiramisú, o 1 chocotorta, o 2 barras sin bañar, o 1 galletón, o 1 alfajor, o 6 cookies, o 7 trufas proteicas).',
    johana: '1 postre proteico Meli (pancakes 6, o 1 tiramisú, o 1 chocotorta, o 2 barras sin bañar, o 1 galletón, o 1 alfajor, o 6 cookies, o 7 trufas proteicas).',
  },
  sc3: {
    carlos: '1 bolsita de merenguitos Snack Well con iced protein coffee: ½ whey con hielo, café instantáneo, stevia.',
    johana: '1 bolsita de merenguitos Snack Well con iced protein coffee: ½ whey con hielo, café instantáneo, stevia.',
  },
  sc4: {
    carlos: 'Mugcake: en una taza mezclar 2 cdas de harina de almendras, 2 cdas de cacao sin azúcar, 3 claras, 1 cda colmada de Tregar blanco light, stevia, ¼ cdta de polvo de hornear, ½ cdta de goma xántica, 1 cdta de vainilla. Opcional canela. 2 min al microondas.',
    johana: 'Mugcake: en una taza mezclar 2 cdas de harina de almendras, 2 cdas de cacao sin azúcar, 3 claras, 1 cda colmada de Tregar blanco light, stevia, ¼ cdta de polvo de hornear, ½ cdta de goma xántica, 1 cdta de vainilla. Opcional canela. 2 min al microondas.',
    cooking: 'En una taza grande mezclar con tenedor: 2 cdas harina de almendras, 2 cdas cacao sin azúcar, 3 claras, 1 cda colmada Tregar, stevia a gusto, ¼ cdta polvo de hornear, ½ cdta goma xántica, 1 cdta vainilla. Opcional: canela. Microondas 2 min. Se infla y queda esponjoso.',
  },
  sc5: {
    carlos: '½ lata de atún con 2 claras duras cocidas.',
    johana: '½ lata de atún con 2 claras duras cocidas.',
  },
  sc6: {
    carlos: '4 claras y 2 fetas de pavita.',
    johana: '4 claras y 2 fetas de pavita.',
  },
  sc7: {
    carlos: 'Cheesecake proteica casera: 100g de queso crema Tregar con 3 claras, vainilla, stevia. 2 min y 30 seg en el microondas.',
    johana: 'Cheesecake proteica casera: 100g de queso crema Tregar con 3 claras, vainilla, stevia. 2 min y 30 seg en el microondas.',
    cooking: 'Mezclar 100g de queso crema Tregar con 3 claras, vainilla y stevia a gusto. Verter en recipiente apto para microondas. Cocinar 2 min 30 seg. Dejar enfriar antes de comer.',
  },
  sc8: {
    carlos: 'Frappuccino proteico: ¾ medida de whey protein, ¼ taza hielo, ½ taza de agua fría, 1 cdta de café Nescafé Ice, y cacao sin azúcar.',
    johana: 'Frappuccino proteico: ¾ medida de whey protein, ¼ taza hielo, ½ taza de agua fría, 1 cdta de café Nescafé Ice, y cacao sin azúcar.',
  },
  sc9: {
    carlos: '1 medida de whey con agua.',
    notes: 'Solo Carlos.',
  },
  sc10: {
    carlos: '¾ medida de whey, ¼ taza de leche Protein 0% o de almendras, mucho hielo, 1 cdta de Nescafé Ice, stevia.',
    notes: 'Solo Carlos.',
  },
  sc11: {
    carlos: 'Gelatina proteica: 1 sobre de gelatina sin sabor con ½ taza de agua caliente, 2 medidas de whey disueltas en 1 taza de agua fría, mezclar con 3 cdas de cacao y stevia. Dejar en heladera 3 horas. ¡Comer la mitad!',
    johana: 'Gelatina proteica: 1 sobre de gelatina sin sabor con ½ taza de agua caliente, 1 medida de whey en 1 taza de agua fría, 2 cdas de cacao, stevia. Mezclar, refrigerar hasta solidificar. ¡Comer la mitad!',
    cooking: 'Disolver 1 sobre de gelatina sin sabor en ½ taza de agua caliente. Aparte, disolver whey en 1 taza de agua fría con cacao y stevia. Mezclar ambos líquidos. Refrigerar mínimo 3 horas hasta que solidifique. ¡Comer solo la mitad! Rinde para 2 porciones.',
  },
  sc12: {
    carlos: 'Helado proteico casero: 1 bandeja de arándanos congelados con ¾ medida de whey, stevia, apenas un pelín de agua. Procesar y listo.',
    johana: 'Helado proteico casero: 1 bandeja de arándanos congelados con ¾ medida de whey, stevia, apenas un pelín de agua. Procesar y listo.',
    cooking: 'Colocar 1 bandeja de arándanos congelados en procesadora o licuadora. Agregar ¾ medida de whey, stevia a gusto y apenas un pelín de agua. Procesar hasta lograr textura de helado cremoso. Servir inmediatamente.',
  },

  // ═══════════════════════════════════════════
  // SNACKS / MERIENDAS JOHANA
  // ═══════════════════════════════════════════
  sj1: {
    johana: 'ICED PROTEIN COFFEE: ½ taza de leche de almendras o Protein 0% con 1 medida de whey, hielo, stevia a gusto.',
    notes: 'Solo Johana. Proteico.',
  },
  sj2: {
    johana: 'Gelatina sin sabor preparada con ½ taza de agua caliente y ½ medida de whey en 1 taza de agua fría, 2 cdas de cacao, stevia. Mezclar y refrigerar. Comer la mitad.',
    notes: 'Solo Johana. Proteico.',
  },
  sj3: {
    johana: '1 paquete de merenguitos Snack Well.',
    notes: 'Solo Johana. Proteico.',
  },
  sj4: {
    johana: '2 postres de Malabra Egg Protein (roll de vainilla o de cacao).',
    notes: 'Solo Johana. Proteico.',
  },
  sj6: {
    johana: 'Muffin: procesar 1 huevo, 1 clara, 1 cda de queso crema, ½ cdta de goma xántica, ½ cdta de polvo de hornear, ½ medida de whey, 1 cda de cacao. Microondas 1-2 min.',
    notes: 'Solo Johana. Proteico.',
  },
  sj7: {
    johana: '1 barra low carb (Mervick, Gentech, o low sugar de Pure Wellness) con Iced Protein Coffee: ¼ taza de leche almendras o agua, ½ medida de whey, hielo, stevia.',
    notes: 'Solo Johana. Proteico.',
  },
  sj15: {
    johana: '1 cheesecake de frutos rojos de Nemoral.',
    notes: 'Solo Johana. Proteico.',
  },
  sj16: {
    johana: '1 pan nube de jamón y queso de Café Martínez.',
    notes: 'Solo Johana. Proteico.',
  },
  sj17: {
    johana: '½ pan keto de Starbucks.',
    notes: 'Solo Johana. Proteico.',
  },

  // Snacks Johana con carbos
  sjc2: {
    johana: '25g de chocolate amargo Nutrirte y ¾ whey con leche de almendras.',
    notes: 'Solo Johana. Con carbos.',
  },
  sjc3: {
    johana: 'Licuado: ½ banana, ½ vaso de agua, ¾ medida de whey protein, stevia, canela, vainilla opcional.',
    notes: 'Solo Johana. Con carbos.',
  },
  sjc4: {
    johana: 'Licuado de frutos rojos: ½ vaso de agua, 120g frutos rojos congelados, ¾ medida de whey protein, stevia.',
    notes: 'Solo Johana. Con carbos.',
  },
  sjc5: {
    johana: 'Fruta entera (1 taza de melón, sandía o frutillas, o ½ banana, o 1 fruta) con 100g de yogurt Kay griego con ½ whey.',
    notes: 'Solo Johana. Con carbos.',
  },
  sjc6: {
    johana: 'Pancake de banana: ½ banana con 1 huevo y 2 claras, vainilla, canela, stevia y Mr Taste. 2 cdas de Tregar blanco light de topping.',
    notes: 'Solo Johana. Con carbos.',
  },
  sjc7: {
    johana: '100g de yogurt Kay con ½ medida de whey, stevia, vainilla opcional, 2 cdas de semillas de chía, 60g de frutos rojos.',
    notes: 'Solo Johana. Con carbos.',
  },

  // ═══════════════════════════════════════════
  // POSTRES CARLOS (post-cena)
  // ═══════════════════════════════════════════
  dc1: {
    carlos: 'ICED PROTEIN COFFEE: ½ taza de leche de almendras o Protein 0% con ½ medida de whey, hielo, stevia a gusto.',
    notes: 'Postre post-cena Carlos. 14-21g proteína.',
  },
  dc2: {
    carlos: 'Gelatina sin sabor con ½ taza agua caliente, 1 medida de whey en 1 taza agua fría, 2 cdas cacao, stevia. Mezclar y refrigerar. Comer la mitad.',
    notes: 'Postre post-cena Carlos.',
  },
  dc3: {
    carlos: '½ paquete de merenguitos Snack Well.',
    notes: 'Postre post-cena Carlos.',
  },
  dc4: {
    carlos: '1 postre de Malabra Egg Protein (roll de vainilla o de cacao).',
    notes: 'Postre post-cena Carlos.',
  },
  dc5: {
    carlos: '1 barra low carb o low sugar.',
    notes: 'Postre post-cena Carlos.',
  },
  dc6: {
    carlos: '1 helado Frosz proteico cualquier gusto.',
    notes: 'Postre post-cena Carlos.',
  },

  // ═══════════════════════════════════════════
  // CARBOHIDRATOS (cena)
  // ═══════════════════════════════════════════
  carb1: {
    carlos: '1 batata o boniato o papa: 100g cocidos.',
    johana: '1 batata o boniato o papa: 100g cocidos.',
  },
  carb2: {
    carlos: 'Calabaza o zapallo: 300g cocidos.',
    johana: 'Calabaza o zapallo: 300g cocidos.',
  },
  carb3: {
    carlos: '½ plátano al horno, plancha o hervido.',
    johana: '½ plátano al horno, plancha o hervido.',
  },
  carb4: {
    carlos: '1 fruta de estación.',
    johana: '1 fruta de estación.',
  },
  carb5: {
    carlos: '25g de chocolate sin azúcar al 70%.',
    johana: '25g de chocolate sin azúcar al 70%.',
  },
  carb6: {
    carlos: '½ taza cocida de arroz yamani integral.',
    johana: '½ taza cocida de arroz yamani integral.',
    notes: '⚠️ Máx 2 veces por semana. Más calórico y genera más inflamación.',
  },
  carb7: {
    carlos: '½ taza cocida de pasta integral.',
    johana: '½ taza cocida de fideos integrales.',
    notes: '⚠️ Máx 2 veces por semana.',
  },
  carb8: {
    carlos: '½ taza cocida de quinoa.',
    johana: '½ taza cocida de quinoa.',
    notes: '⚠️ Máx 2 veces por semana.',
  },
  carb9: {
    carlos: '½ taza cocida de lentejas o arvejas.',
    johana: '½ taza cocida de lentejas o arvejas.',
    notes: '⚠️ Máx 2 veces por semana.',
  },
  carb10: {
    carlos: '2 rebanadas de pan integral Val Maira.',
    johana: '2 rebanadas de pan integral Val Maira.',
    notes: '⚠️ Máx 2 veces por semana.',
  },
};

/** General nutrition rules per person */
export const generalRules = {
  carlos: {
    protein: '193g de proteína al día (2.2g x 87kg)',
    meals: '5 comidas: desayuno, almuerzo, merienda, cena y postre',
    fasting: 'Ayuno intermitente mín 13 hs',
    carbs: 'Solo 1 o 2 carbos al día máximo',
    fats: 'Grasas máx 1 al día: ¼ palta, 6 aceitunas, 1 cdta oliva, o 1 reb pan keto',
    supplements: 'ZMA 2 caps antes de dormir, Whey, Creatina 5g diarios, Cafeína 200mg pre-entreno',
    lunch: 'Almuerzo: 1 proteína (42g prot) + vegetales libres. Sin carbos.',
    dinner: 'Cena: 1 proteína (42g prot) + vegetales + 1 carbohidrato (15g carbos).',
  },
  johana: {
    protein: '114g de proteína al día (2.2g x peso)',
    meals: '5 comidas: desayuno, almuerzo, merienda, cena y postre opcional',
    fasting: 'Ayuno intermitente mín 13 hs',
    carbs: 'Solo 1 o 2 carbos al día',
    fats: 'NO agregar aceites, mantequilla de maní ni frutos secos ni palta (excepto lo indicado)',
    supplements: 'ZMA 2 caps antes de dormir, Cafeína 200mg pre-entreno, Whey opcional',
    lunch: 'Almuerzo: 1 proteína (35g prot) + vegetales libres. 15g carbos.',
    dinner: 'Cena: 1 proteína (35g prot) + vegetales + 1 carbohidrato. Low carb.',
  },
};
