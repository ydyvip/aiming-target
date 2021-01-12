export const actionRecords = [
  /** reds */

  /** 112赵八一 C */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "112",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "112", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "112", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "112", cmd: "c2s_carry" },
  // 巡逻进攻阶段
  {
    TIMEFRAME: 958,
    id: "112",
    cmd: "c2s_move",
    position: { x: 46.23875715453802, y: 69.30498773507767 }
  },
  {
    TIMEFRAME: 12160,
    id: "112",
    cmd: "c2s_move",
    position: { x: 57.50613246116108, y: 60.80130825838103 }
  },

  {
    TIMEFRAME: 15189,
    id: "112",
    cmd: "c2s_move",
    position: { x: 60.64349959116926, y: 50.70318887980376 }
  },
  {
    TIMEFRAME: 20260,
    id: "112",
    cmd: "c2s_move",
    position: { x: 58.037612428454615, y: 62.608340147179064 }
  },
  {
    TIMEFRAME: 25066,
    id: "112",
    cmd: "c2s_move",
    position: { x: 57.93131643499591, y: 80.78495502861814 }
  },
  {
    TIMEFRAME: 29356,
    id: "112",
    cmd: "c2s_move",
    position: { x: 59.20686835650041, y: 85.67457072771872 }
  },
  {
    TIMEFRAME: 32799,
    id: "112",
    cmd: "c2s_move",
    position: { x: 44.53802125919869, y: 68.87980376124284 }
  },
  // 火力掩护
  {
    TIMEFRAME: 38279,
    id: "112",
    cmd: "c2s_move",
    position: { x: 55.27391659852821, y: 71.00572363041701 }
  },
  {
    TIMEFRAME: 39534,
    id: "112",
    cmd: "c2s_move",
    position: { x: 56.12428454619787, y: 73.34423548650858 }
  },
  {
    TIMEFRAME: 41534,
    id: "112",
    cmd: "c2s_rotation",
    direct: 0,
    angle: 35
  },
  { TIMEFRAME: 42221, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 42884, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 43550, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 44264, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 45476, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 47153, id: "112", cmd: "c2s_attack" },
  // 追击
  {
    TIMEFRAME: 48258,
    id: "112",
    cmd: "c2s_move",
    position: { x: 38.1, y: 68.3 }
  },
  {
    TIMEFRAME: 51196,
    id: "112",
    cmd: "c2s_move",
    position: { x: 36, y: 56.4 }
  },
  {
    TIMEFRAME: 54314,
    id: "112",
    cmd: "c2s_move",
    position: { x: 51.2, y: 57 }
  },
  {
    TIMEFRAME: 58785,
    id: "112",
    cmd: "c2s_move",
    position: { x: 60, y: 49.5 }
  },
  {
    TIMEFRAME: 61610,
    id: "112",
    cmd: "c2s_move",
    position: { x: 101.8, y: 51.9 }
  },

  /** 113陈卫国 C */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "113",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "113", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "113", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "113", cmd: "c2s_carry" },
  // 巡逻进攻阶段
  {
    TIMEFRAME: 2717,
    id: "113",
    cmd: "c2s_move",
    position: { x: 53.360588716271465, y: 69.41128372853639 }
  },
  {
    TIMEFRAME: 11892,
    id: "113",
    cmd: "c2s_move",
    position: { x: 57.39983646770237, y: 78.44644317252657 }
  },
  {
    TIMEFRAME: 18317,
    id: "113",
    cmd: "c2s_move",
    position: { x: 56.97465249386754, y: 60.4824202780049 }
  },

  {
    TIMEFRAME: 23291,
    id: "113",
    cmd: "c2s_move",
    position: { x: 57.8250204415372, y: 48.78986099754702 }
  },
  {
    TIMEFRAME: 25666,
    id: "113",
    cmd: "c2s_move",
    position: { x: 58.82093213409648, y: 49.00245298446443 }
  },
  // 击杀201
  { TIMEFRAME: 26527, id: "113", cmd: "c2s_aim" },
  {
    TIMEFRAME: 26858,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 20.016169721817903
  },
  { TIMEFRAME: 27907, id: "113", cmd: "c2s_attack" },

  { TIMEFRAME: 28659, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 29369, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 30616, id: "113", cmd: "c2s_carry" },
  {
    TIMEFRAME: 31698,
    id: "113",
    cmd: "c2s_move",
    position: { x: 50.5, y: 68.5 }
  },
  {
    TIMEFRAME: 35569,
    id: "113",
    cmd: "c2s_move",
    position: { x: 47.93949304987735, y: 69.6238757154538 }
  },
  // 追击 巡逻C
  {
    TIMEFRAME: 39941,
    id: "113",
    cmd: "c2s_move",
    position: { x: 43.049877350776775, y: 87.05641864268193 }
  },
  {
    TIMEFRAME: 45742,
    id: "113",
    cmd: "c2s_move",
    position: { x: 58.88798037612428, y: 97.36713000817662 }
  },
  { TIMEFRAME: 47531, id: "113", cmd: "c2s_aim" },
  {
    TIMEFRAME: 48749,
    id: "113",
    cmd: "c2s_move",
    position: { x: 53.04170073589534, y: 97.36713000817662 }
  },
  {
    TIMEFRAME: 49925,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 10.76026124051225
  },
  { TIMEFRAME: 50235, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 51908, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 52157, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 53383, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 54769, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 55005, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 55659, id: "113", cmd: "c2s_carry" },
  // 击杀213
  {
    TIMEFRAME: 56156,
    id: "113",
    cmd: "c2s_move",
    position: { x: 82.1, y: 95 }
  },
  {
    TIMEFRAME: 62268,
    id: "113",
    cmd: "c2s_move",
    position: { x: 95, y: 92.1 }
  },
  { TIMEFRAME: 67244, id: "113", cmd: "c2s_aim" },

  {
    TIMEFRAME: 67862,
    id: "113",
    cmd: "c2s_rotation",
    direct: 0,
    angle: 10.0887749248183
  },
  { TIMEFRAME: 70522, id: "113", cmd: "c2s_attack" },
  { TIMEFRAME: 73522, id: "113", cmd: "c2s_attack" },

  /** 101张晓北 A */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "101",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "101", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "101", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "101", cmd: "c2s_carry" },
  // 巡逻进攻阶段
  {
    TIMEFRAME: 5266,
    id: "101",
    cmd: "c2s_move",
    position: { x: 22.9, y: 34.4 }
  },

  {
    TIMEFRAME: 9920,
    id: "101",
    cmd: "c2s_move",
    position: { x: 47.514309076042515, y: 47.08912510220768 }
  },

  {
    TIMEFRAME: 14674,
    id: "101",
    cmd: "c2s_move",
    position: { x: 49.32134096484055, y: 32.31398201144726 }
  },
  {
    TIMEFRAME: 20824,
    id: "101",
    cmd: "c2s_move",
    position: { x: 46.663941128372855, y: 19.877350776778414 }
  },
  {
    TIMEFRAME: 26073,
    id: "101",
    cmd: "c2s_move",
    position: { x: 58.46279640228945, y: 13.92477514309076 }
  },
  {
    TIMEFRAME: 32203,
    id: "101",
    cmd: "c2s_move",
    position: { x: 59, y: 27.2 }
  },
  {
    TIMEFRAME: 36911,
    id: "101",
    cmd: "c2s_move",
    position: { x: 57.9, y: 35.1 }
  },
  {
    TIMEFRAME: 39557,
    id: "101",
    cmd: "c2s_move",
    position: { x: 58.3, y: 45.4 }
  },
  {
    TIMEFRAME: 41456,
    id: "101",
    cmd: "c2s_move",
    position: { x: 68.3, y: 48.8 }
  },
  // 击杀
  { TIMEFRAME: 42426, id: "101", cmd: "c2s_attack" },
  { TIMEFRAME: 42623, id: "101", cmd: "c2s_attack" },
  { TIMEFRAME: 42820, id: "101", cmd: "c2s_attack" },
  { TIMEFRAME: 43013, id: "101", cmd: "c2s_attack" },
  {
    TIMEFRAME: 45183,
    id: "101",
    cmd: "c2s_move",
    position: { x: 52.9, y: 48.5 }
  },
  {
    TIMEFRAME: 48060,
    id: "101",
    cmd: "c2s_move",
    position: { x: 49.9, y: 41.8 }
  },
  {
    TIMEFRAME: 49569,
    id: "101",
    cmd: "c2s_move",
    position: { x: 58.2, y: 25.3 }
  },
  {
    TIMEFRAME: 50569,
    id: "101",
    cmd: "c2s_move",
    position: { x: 99, y: 29.2 }
  },
  // 追击
  {
    TIMEFRAME: 53569,
    id: "101",
    cmd: "c2s_move",
    position: { x: 115.3, y: 11.7 }
  },

  /** 115谢维和 B */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "115",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "115", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "115", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "115", cmd: "c2s_carry" },
  // 巡逻进攻阶段
  {
    TIMEFRAME: 5637,
    id: "115",
    cmd: "c2s_move",
    position: { x: 20.727718724448078, y: 34.97138184791496 }
  },
  {
    TIMEFRAME: 8856,
    id: "115",
    cmd: "c2s_move",
    position: { x: 38.90433360588716, y: 34.865085854456254 }
  },
  {
    TIMEFRAME: 12148,
    id: "115",
    cmd: "c2s_move",
    position: { x: 38.69174161896974, y: 43.3687653311529 }
  },
  {
    TIMEFRAME: 15777,
    id: "115",
    cmd: "c2s_move",
    position: { x: 48.5772690106296, y: 43.793949304987734 }
  },
  {
    TIMEFRAME: 18727,
    id: "115",
    cmd: "c2s_move",
    position: { x: 49.108748977923135, y: 38.47914963205233 }
  },
  {
    TIMEFRAME: 20810,
    id: "115",
    cmd: "c2s_move",
    position: { x: 48.78986099754702, y: 31.569910057236303 }
  },
  {
    TIMEFRAME: 22890,
    id: "115",
    cmd: "c2s_move",
    position: { x: 58.14390842191332, y: 27.955846279640227 }
  },
  {
    TIMEFRAME: 30204,
    id: "115",
    cmd: "c2s_move",
    position: { x: 67.95, y: 29.1 }
  },
  {
    TIMEFRAME: 32031,
    id: "115",
    cmd: "c2s_move",
    position: { x: 56.95, y: 42.3 }
  },
  {
    TIMEFRAME: 36234,
    id: "115",
    cmd: "c2s_move",
    position: { x: 68.45, y: 48.8 }
  },
  {
    TIMEFRAME: 40863,
    id: "115",
    cmd: "c2s_move",
    position: { x: 59.2, y: 45.1 }
  },
  { TIMEFRAME: 43689, id: "115", cmd: "c2s_move", position: { x: 59, y: 36 } },

  /** 105陈建党 D */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "105",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "105", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "105", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "105", cmd: "c2s_carry" },
  {
    TIMEFRAME: 2390,
    id: "105",
    cmd: "c2s_move",
    position: { x: 23.066230580539656, y: 84.50531479967293 }
  },
  {
    TIMEFRAME: 6252,
    id: "105",
    cmd: "c2s_move",
    position: { x: 28.9125102207686, y: 82.06050695012264 }
  },
  {
    TIMEFRAME: 8225,
    id: "105",
    cmd: "c2s_move",
    position: { x: 40.39247751430907, y: 68.454619787408 }
  },
  {
    TIMEFRAME: 11841,
    id: "105",
    cmd: "c2s_move",
    position: { x: 56.443172526573996, y: 70.26165167620604 }
  },
  {
    TIMEFRAME: 17397,
    id: "105",
    cmd: "c2s_move",
    position: { x: 56.76206050695012, y: 86.52493867538838 }
  },
  { TIMEFRAME: 18806, id: "105", cmd: "c2s_aim" },
  {
    TIMEFRAME: 20264,
    id: "105",
    cmd: "c2s_move",
    position: { x: 57.39983646770237, y: 88.65085854456255 }
  },
  { TIMEFRAME: 21806, id: "105", cmd: "c2s_attack" },
  {
    TIMEFRAME: 22258,
    id: "105",
    cmd: "c2s_move",
    position: { x: 62.608340147179064, y: 94.70973017170891 }
  },
  { TIMEFRAME: 22983, id: "105", cmd: "c2s_attack" },
  { TIMEFRAME: 23220, id: "105", cmd: "c2s_attack" },
  { TIMEFRAME: 23412, id: "105", cmd: "c2s_attack" },
  {
    TIMEFRAME: 24303,
    id: "105",
    cmd: "c2s_move",
    position: { x: 70.79313164349959, y: 95.45380212591986 }
  },

  {
    TIMEFRAME: 25514,
    id: "105",
    cmd: "c2s_move",
    position: { x: 54.42354865085854, y: 93.32788225674571 }
  },
  {
    TIMEFRAME: 26324,
    id: "105",
    cmd: "c2s_move",
    position: { x: 57.39983646770237, y: 90.03270645952576 }
  },
  {
    TIMEFRAME: 28747,
    id: "105",
    cmd: "c2s_move",
    position: { x: 58.14390842191332, y: 82.80457890433361 }
  },
  {
    TIMEFRAME: 31344,
    id: "105",
    cmd: "c2s_move",
    position: { x: 47.3017170891251, y: 68.56091578086672 }
  },

  {
    TIMEFRAME: 34344,
    id: "105",
    cmd: "c2s_move",
    position: { x: 39.1, y: 77.3 }
  },

  /** blues */

  /** 213陈建忠 SB */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "213",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "213", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "213", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "213", cmd: "c2s_carry" },
  // 第一阶段巡逻
  {
    TIMEFRAME: 1653,
    id: "213",
    cmd: "c2s_move",
    position: { x: 108.9533932951758, y: 5.846279640228945 }
  },
  {
    TIMEFRAME: 3319,
    id: "213",
    cmd: "c2s_move",
    position: { x: 99.38675388389207, y: 7.653311529026983 }
  },
  {
    TIMEFRAME: 5346,
    id: "213",
    cmd: "c2s_move",
    position: { x: 114.48078495502861, y: 11.054783319705642 }
  },
  {
    TIMEFRAME: 8107,
    id: "213",
    cmd: "c2s_move",
    position: { x: 104.80784955028618, y: 7.972199509403107 }
  },
  {
    TIMEFRAME: 10706,
    id: "213",
    cmd: "c2s_move",
    position: { x: 108.52820932134097, y: 14.562551103843008 }
  },
  {
    TIMEFRAME: 13040,
    id: "213",
    cmd: "c2s_move",
    position: { x: 120.64595257563369, y: 5.6336876533115285 }
  },
  {
    TIMEFRAME: 14628,
    id: "213",
    cmd: "c2s_move",
    position: { x: 103.63859362224039, y: 6.590351594439902 }
  },
  {
    TIMEFRAME: 16600,
    id: "213",
    cmd: "c2s_move",
    position: { x: 106.50858544562551, y: 14.98773507767784 }
  },

  // 战术回拢
  {
    TIMEFRAME: 22015,
    id: "213",
    cmd: "c2s_move",
    position: { x: 104.4, y: 26.1 }
  },
  {
    TIMEFRAME: 24692,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 69.23531180105368
  },
  {
    TIMEFRAME: 24947,
    id: "213",
    cmd: "c2s_move",
    position: { x: 98.4, y: 34.5 }
  },
  {
    TIMEFRAME: 27512,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 178.65394343559728
  },
  {
    TIMEFRAME: 34407,
    id: "213",
    cmd: "c2s_move",
    position: { x: 98.4, y: 53.6 }
  },
  {
    TIMEFRAME: 38024,
    id: "213",
    cmd: "c2s_move",
    position: { x: 93.8, y: 66.2 }
  },
  {
    TIMEFRAME: 39955,
    id: "213",
    cmd: "c2s_move",
    position: { x: 80, y: 66.8 }
  },
  {
    TIMEFRAME: 42077,
    id: "213",
    cmd: "c2s_move",
    position: { x: 74, y: 60.6 }
  },
  {
    TIMEFRAME: 48117,
    id: "213",
    cmd: "c2s_move",
    position: { x: 73.3, y: 51.6 }
  },
  {
    TIMEFRAME: 51117,
    id: "213",
    cmd: "c2s_move",
    position: { x: 74.8, y: 52.4 }
  },
  // 撤回基地
  {
    TIMEFRAME: 55117,
    id: "213",
    cmd: "c2s_move",
    position: { x: 78.4, y: 66.3 }
  },
  {
    TIMEFRAME: 57117,
    id: "213",
    cmd: "c2s_move",
    position: { x: 122.9, y: 60.7 }
  },
  // 被击毙

  /** 202蒋经纬 巡逻A */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "202",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "202", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "202", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "202", cmd: "c2s_carry" },
  // 第一阶段巡逻
  {
    TIMEFRAME: 1494,
    id: "202",
    cmd: "c2s_move",
    position: { x: 104.06377759607523, y: 35.396565821749796 }
  },
  {
    TIMEFRAME: 3024,
    id: "202",
    cmd: "c2s_move",
    position: { x: 86.41864268192968, y: 26.999182338511854 }
  },
  {
    TIMEFRAME: 8065,
    id: "202",
    cmd: "c2s_move",
    position: { x: 102.68192968111201, y: 30.932134096484056 }
  },
  {
    TIMEFRAME: 9672,
    id: "202",
    cmd: "c2s_move",
    position: { x: 86.84382665576452, y: 28.062142273098935 }
  },
  {
    TIMEFRAME: 11689,
    id: "202",
    cmd: "c2s_move",
    position: { x: 106.18969746524938, y: 27.955846279640227 }
  },
  {
    TIMEFRAME: 16372,
    id: "202",
    cmd: "c2s_move",
    position: { x: 92.90269828291088, y: 29.125102207686016 }
  },
  {
    TIMEFRAME: 18563,
    id: "202",
    cmd: "c2s_move",
    position: { x: 100.23712183156174, y: 59.84464431725266 }
  },
  {
    TIMEFRAME: 26320,
    id: "202",
    cmd: "c2s_move",
    position: { x: 76.42681929681112, y: 65.90351594439902 }
  },
  {
    TIMEFRAME: 32310,
    id: "202",
    cmd: "c2s_move",
    position: { x: 75.25756336876533, y: 54.42354865085854 }
  },
  //击杀谢维和
  {
    TIMEFRAME: 36728,
    id: "202",
    cmd: "c2s_move",
    position: { x: 66, y: 47.9 }
  },
  { TIMEFRAME: 37669, id: "202", cmd: "c2s_attack" },
  { TIMEFRAME: 37874, id: "202", cmd: "c2s_attack" },
  { TIMEFRAME: 38238, id: "202", cmd: "c2s_attack" },

  {
    TIMEFRAME: 40611,
    id: "202",
    cmd: "c2s_move",
    position: { x: 82.5, y: 48.7 }
  },

  // 战术回拢

  /** 201廖信忠 巡逻B */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "201",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "201", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "201", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "201", cmd: "c2s_carry" },
  // 第一阶段巡逻
  {
    TIMEFRAME: 1816,
    id: "201",
    cmd: "c2s_move",
    position: { x: 97.89860997547015, y: 58.25020441537203 }
  },
  {
    TIMEFRAME: 3940,
    id: "201",
    cmd: "c2s_move",
    position: { x: 91.9460343417825, y: 48.258381030253474 }
  },
  {
    TIMEFRAME: 6684,
    id: "201",
    cmd: "c2s_move",
    position: { x: 103.31970564186426, y: 43.687653311529026 }
  },
  {
    TIMEFRAME: 8811,
    id: "201",
    cmd: "c2s_move",
    position: { x: 102.57563368765331, y: 52.82910874897792 }
  },
  {
    TIMEFRAME: 11273,
    id: "201",
    cmd: "c2s_move",
    position: { x: 92.05233033524121, y: 49.00245298446443 }
  },
  {
    TIMEFRAME: 13657,
    id: "201",
    cmd: "c2s_move",
    position: { x: 102.68192968111201, y: 42.30580539656582 }
  },
  {
    TIMEFRAME: 15616,
    id: "201",
    cmd: "c2s_move",
    position: { x: 102.89452166802943, y: 58.25020441537203 }
  },
  {
    TIMEFRAME: 18595,
    id: "201",
    cmd: "c2s_move",
    position: { x: 87.37530662305805, y: 48.78986099754702 }
  },
  { TIMEFRAME: 21247, id: "201", cmd: "c2s_aim" },
  {
    TIMEFRAME: 24159,
    id: "201",
    cmd: "c2s_move",
    position: { x: 75.04497138184792, y: 49.852820932134094 }
  },
  {
    TIMEFRAME: 25433,
    id: "201",
    cmd: "c2s_move",
    position: { x: 90.77677841373671, y: 48.5772690106296 }
  },
  { TIMEFRAME: 25915, id: "201", cmd: "c2s_attack" },

  {
    TIMEFRAME: 28076,
    id: "201",
    cmd: "c2s_move",
    position: { x: 94.07195421095666, y: 50.59689288634505 }
  },

  /** 212王爱国 巡逻C */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "212",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "212", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "212", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "212", cmd: "c2s_carry" },
  // 第一阶段巡逻
  {
    TIMEFRAME: 1145,
    id: "212",
    cmd: "c2s_move",
    position: { x: 90.98937040065412, y: 93.43417825020441 }
  },
  {
    TIMEFRAME: 2838,
    id: "212",
    cmd: "c2s_move",
    position: { x: 103.42600163532298, y: 95.34750613246116 }
  },
  {
    TIMEFRAME: 4294,
    id: "212",
    cmd: "c2s_move",
    position: { x: 101.3000817661488, y: 86.09975470155355 }
  },
  {
    TIMEFRAME: 6146,
    id: "212",
    cmd: "c2s_move",
    position: { x: 89.07604251839739, y: 97.47342600163532 }
  },
  {
    TIMEFRAME: 8615,
    id: "212",
    cmd: "c2s_move",
    position: { x: 101.3000817661488, y: 88.22567457072772 }
  },
  {
    TIMEFRAME: 11633,
    id: "212",
    cmd: "c2s_move",
    position: { x: 87.26901062959934, y: 98.00490596892887 }
  },
  {
    TIMEFRAME: 13904,
    id: "212",
    cmd: "c2s_move",
    position: { x: 103.53229762878168, y: 93.85936222403924 }
  },
  {
    TIMEFRAME: 16219,
    id: "212",
    cmd: "c2s_move",
    position: { x: 102.36304170073589, y: 88.22567457072772 }
  },
  {
    TIMEFRAME: 17773,
    id: "212",
    cmd: "c2s_move",
    position: { x: 92.26492232215863, y: 96.30417007358953 }
  },
  {
    TIMEFRAME: 21786,
    id: "212",
    cmd: "c2s_move",
    position: { x: 84.61161079313165, y: 95.8789860997547 }
  },
  { TIMEFRAME: 23673, id: "212", cmd: "c2s_aim" },
  { TIMEFRAME: 24672, id: "212", cmd: "c2s_attack" },
  // { TIMEFRAME: 25782, id: "212", cmd: "c2s_attack" },
  {
    TIMEFRAME: 26460,
    id: "212",
    cmd: "c2s_move",
    position: { x: 70.2, y: 93.9 }
  },
  {
    TIMEFRAME: 32400,
    id: "212",
    cmd: "c2s_move",
    position: { x: 63.56500408830744, y: 94.92232215862633 }
  },
  {
    TIMEFRAME: 46970,
    id: "212",
    cmd: "c2s_move",
    position: { x: 99.38675388389207, y: 94.92232215862633 }
  },

  /** 215林胜利 SA */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "215",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "215", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "215", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "215", cmd: "c2s_carry" },
  // 第一阶段巡逻
  {
    TIMEFRAME: 4105,
    id: "215",
    cmd: "c2s_move",
    position: { x: 103.31970564186426, y: 68.24202780049059 }
  },
  {
    TIMEFRAME: 6475,
    id: "215",
    cmd: "c2s_move",
    position: { x: 87.26901062959934, y: 65.90351594439902 }
  },
  {
    TIMEFRAME: 9847,
    id: "215",
    cmd: "c2s_move",
    position: { x: 79.29681112019624, y: 79.82829108748977 }
  },
  {
    TIMEFRAME: 14999,
    id: "215",
    cmd: "c2s_move",
    position: { x: 77.4897792313982, y: 87.26901062959934 }
  },
  {
    TIMEFRAME: 15626,
    id: "215",
    cmd: "c2s_move",
    position: { x: 75.25756336876533, y: 92.15862632869991 }
  },
  {
    TIMEFRAME: 18685,
    id: "215",
    cmd: "c2s_move",
    position: { x: 68.13573180703189, y: 96.62305805396565 }
  },
  {
    TIMEFRAME: 24180,
    id: "215",
    cmd: "c2s_move",
    position: { x: 77.4897792313982, y: 95.772690106296 }
  }
];
