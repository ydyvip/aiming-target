export const actionRecords = [
  /** reds */

  /** 101张晓北 红A */
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
  // 第一阶段
  {
    TIMEFRAME: 1133,
    id: "101",
    cmd: "c2s_move",
    position: { x: 13.8, y: 36.8 }
  },
  {
    TIMEFRAME: 15876,
    id: "101",
    cmd: "c2s_move",
    position: { x: 39.3, y: 33.7 }
  },
  {
    TIMEFRAME: 30906,
    id: "101",
    cmd: "c2s_move",
    position: { x: 49.7, y: 32.9 }
  },
  {
    TIMEFRAME: 40183,
    id: "101",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 294.2036765189024
  },
  {
    TIMEFRAME: 42394,
    id: "101",
    cmd: "c2s_move",
    position: { x: 51.7, y: 20 }
  },
  {
    TIMEFRAME: 47644,
    id: "101",
    cmd: "c2s_move",
    position: { x: 55.5, y: 13.6 }
  },
  {
    TIMEFRAME: 53326,
    id: "101",
    cmd: "c2s_move",
    position: { x: 66.4, y: 24.6 }
  },

  {
    TIMEFRAME: 67456,
    id: "101",
    cmd: "c2s_move",
    position: { x: 66.3, y: 11.1 }
  },
  {
    TIMEFRAME: 75848,
    id: "101",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 403.13064381645626
  },
  // 第二阶段
  {
    TIMEFRAME: 80181,
    id: "101",
    cmd: "c2s_move",
    position: { x: 66.4, y: 24.6 }
  },
  {
    TIMEFRAME: 88694,
    id: "101",
    cmd: "c2s_rotation",
    direct: 0,
    angle: 28
  },

  {
    TIMEFRAME: 140556,
    id: "101",
    cmd: "c2s_move",
    position: { x: 66.1, y: 11.7 }
  },

  {
    TIMEFRAME: 148032,
    id: "101",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 409.44379541606236
  },
  // 第四阶段
  {
    TIMEFRAME: 163317,
    id: "101",
    cmd: "c2s_move",
    position: { x: 102.9, y: 9.8 }
  },
  {
    TIMEFRAME: 183937,
    id: "101",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 50.16404231200377
  },
  // 第五阶段
  {
    TIMEFRAME: 196416,
    id: "101",
    cmd: "c2s_move",
    position: { x: 117.4, y: 13.9 }
  },
  // 占领敌方据点
  {
    TIMEFRAME: 202825,
    id: "101",
    cmd: "c2s_move",
    position: { x: 121.4, y: 52.7 }
  },
  { TIMEFRAME: 206981, id: "101", cmd: "c2s_attack" },
  { TIMEFRAME: 208981, id: "101", cmd: "c2s_attack" },

  /** 102刘建国 红B */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "102",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "102", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "102", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "102", cmd: "c2s_carry" },
  // 第一阶段
  {
    TIMEFRAME: 1641,
    id: "102",
    cmd: "c2s_move",
    position: { x: 12.9, y: 36.6 }
  },
  {
    TIMEFRAME: 17334,
    id: "102",
    cmd: "c2s_move",
    position: { x: 37.1, y: 33.7 }
  },
  {
    TIMEFRAME: 33307,
    id: "102",
    cmd: "c2s_move",
    position: { x: 51.2, y: 31 }
  },
  {
    TIMEFRAME: 42430,
    id: "102",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 332.0889331835572
  },
  {
    TIMEFRAME: 63666,
    id: "102",
    cmd: "c2s_move",
    position: { x: 59.9, y: 32.3 }
  },
  {
    TIMEFRAME: 70267,
    id: "102",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 319.1849161251181
  },
  {
    TIMEFRAME: 72884,
    id: "102",
    cmd: "c2s_move",
    position: { x: 59.7, y: 45.4 }
  },
  {
    TIMEFRAME: 80884,
    id: "102",
    cmd: "c2s_rotation",
    direct: 0,
    angle: 39.269841274367025
  },
  // 第二阶段
  {
    TIMEFRAME: 89003,
    id: "102",
    cmd: "c2s_move",
    position: { x: 71.9, y: 50.6 }
  },
  {
    TIMEFRAME: 96480,
    id: "102",
    cmd: "c2s_move",
    position: { x: 74.6, y: 60.3 }
  },

  {
    TIMEFRAME: 98057,
    id: "102",
    cmd: "c2s_move",
    position: { x: 75.7, y: 59.9 }
  },
  { TIMEFRAME: 99217, id: "102", cmd: "c2s_attack" },
  { TIMEFRAME: 100629, id: "102", cmd: "c2s_attack" },
  // 第三阶段
  {
    TIMEFRAME: 106296,
    id: "102",
    cmd: "c2s_move",
    position: { x: 76.7, y: 51.6 }
  },
  {
    TIMEFRAME: 111536,
    id: "102",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 408.9247453524426
  },

  /** 103刘建中 红C */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "103",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "103", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "103", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "103", cmd: "c2s_carry" },
  // 第一阶段
  {
    TIMEFRAME: 1186,
    id: "103",
    cmd: "c2s_move",
    position: { x: 4.3, y: 72.2 }
  },
  {
    TIMEFRAME: 7097,
    id: "103",
    cmd: "c2s_move",
    position: { x: 20.4, y: 72.3 }
  },
  {
    TIMEFRAME: 16682,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 330.395303832831
  },
  {
    TIMEFRAME: 18086,
    id: "103",
    cmd: "c2s_move",
    position: { x: 43.8, y: 69.6 }
  },
  {
    TIMEFRAME: 32890,
    id: "103",
    cmd: "c2s_move",
    position: { x: 54.2, y: 68.2 }
  },
  {
    TIMEFRAME: 38637,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 322.977748694082
  },
  {
    TIMEFRAME: 40540,
    id: "103",
    cmd: "c2s_move",
    position: { x: 60, y: 52.3 }
  },
  {
    TIMEFRAME: 52793,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 436.8298721028552
  },
  {
    TIMEFRAME: 65095,
    id: "103",
    cmd: "c2s_move",
    position: { x: 59.2, y: 90.2 }
  },
  // 第二阶段
  {
    TIMEFRAME: 89014,
    id: "103",
    cmd: "c2s_move",
    position: { x: 73.6, y: 85.3 }
  },
  { TIMEFRAME: 97555, id: "103", cmd: "c2s_attack" },
  { TIMEFRAME: 99248, id: "103", cmd: "c2s_attack" },
  {
    TIMEFRAME: 100106,
    id: "103",
    cmd: "c2s_move",
    position: { x: 76.8, y: 85.3 }
  },
  {
    TIMEFRAME: 105312,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 325.84199562024673
  },

  // 第四阶段
  {
    TIMEFRAME: 120466,
    id: "103",
    cmd: "c2s_move",
    position: { x: 80.8, y: 77.6 }
  },
  {
    TIMEFRAME: 125312,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 145.59822026798787
  },
  {
    TIMEFRAME: 127996,
    id: "103",
    cmd: "c2s_move",
    position: { x: 80.3, y: 68.6 }
  },
  {
    TIMEFRAME: 132486,
    id: "103",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 437.2704496706671
  },
  // 第5阶段
  { TIMEFRAME: 202981, id: "103", cmd: "c2s_attack" },
  { TIMEFRAME: 204981, id: "103", cmd: "c2s_attack" },

  /** 112赵八一 红D */
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

  // 第一阶段
  { TIMEFRAME: 1077, id: "112", cmd: "c2s_move", position: { x: 20, y: 72.1 } },
  {
    TIMEFRAME: 13678,
    id: "112",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 330.8531211359883
  },
  {
    TIMEFRAME: 15017,
    id: "112",
    cmd: "c2s_move",
    position: { x: 56.4, y: 68.3 }
  },
  {
    TIMEFRAME: 30634,
    id: "112",
    cmd: "c2s_move",
    position: { x: 53.9, y: 70.7 }
  },

  {
    TIMEFRAME: 37426,
    id: "112",
    cmd: "c2s_move",
    position: { x: 59.4, y: 90.7 }
  },
  {
    TIMEFRAME: 50977,
    id: "112",
    cmd: "c2s_rotation",
    direct: 0,
    angle: 46.84761026599591
  },
  // 第二阶段
  {
    TIMEFRAME: 89003,
    id: "112",
    cmd: "c2s_move",
    position: { x: 76, y: 91.4 }
  },
  { TIMEFRAME: 90900, id: "112", cmd: "c2s_attack" },
  { TIMEFRAME: 92413, id: "112", cmd: "c2s_attack" },
  {
    TIMEFRAME: 96735,
    id: "112",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 25.69843463234682
  },
  // {
  //   TIMEFRAME: 85403,
  //   id: "112",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 80.07780652866884
  // },
  // 第四阶段
  {
    TIMEFRAME: 123292,
    id: "112",
    cmd: "c2s_move",
    position: { x: 76.8, y: 85.4 }
  },
  {
    TIMEFRAME: 126735,
    id: "112",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 407.0389123687913
  },

  /** 113陈卫国 红E */
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
  // 第一阶段
  {
    TIMEFRAME: 1361,
    id: "113",
    cmd: "c2s_move",
    position: { x: 20.5, y: 71.6 }
  },
  {
    TIMEFRAME: 13517,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 323.88405999136444
  },
  {
    TIMEFRAME: 14727,
    id: "113",
    cmd: "c2s_move",
    position: { x: 46.6, y: 67.6 }
  },
  {
    TIMEFRAME: 31415,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 310.74983175006963
  },
  {
    TIMEFRAME: 32321,
    id: "113",
    cmd: "c2s_move",
    position: { x: 51.2, y: 51.4 }
  },
  {
    TIMEFRAME: 42472,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 416.07880425622864
  },
  // 第二阶段
  // {
  //   TIMEFRAME: 78376,
  //   id: "113",
  //   cmd: "c2s_move",
  //   position: { x: 53.4, y: 49.1 }
  // },

  // {
  //   TIMEFRAME: 82496,
  //   id: "113",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 410
  // },
  // { TIMEFRAME: 83071, id: "113", cmd: "c2s_aim" },
  // { TIMEFRAME: 88233, id: "113", cmd: "c2s_attack" },
  // { TIMEFRAME: 92233, id: "113", cmd: "c2s_attack" },
  // 第三阶段
  // { TIMEFRAME: 95642, id: "113", cmd: "c2s_carry" },
  // {
  //   TIMEFRAME: 97348,
  //   id: "113",
  //   cmd: "c2s_move",
  //   position: { x: 51.1, y: 52.1 }
  // },
  // {
  //   TIMEFRAME: 100023,
  //   id: "113",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 175.04972776570753
  // },
  // 第四阶段
  {
    TIMEFRAME: 122825,
    id: "113",
    cmd: "c2s_move",
    position: { x: 51.1, y: 42 }
  },
  {
    TIMEFRAME: 127782,
    id: "113",
    cmd: "c2s_move",
    position: { x: 52, y: 28.2 }
  },
  {
    TIMEFRAME: 134708,
    id: "113",
    cmd: "c2s_move",
    position: { x: 53.4, y: 15.9 }
  },
  {
    TIMEFRAME: 141147,
    id: "113",
    cmd: "c2s_move",
    position: { x: 66.3, y: 11.2 }
  },
  {
    TIMEFRAME: 149123,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 317.60894439507456
  },
  // 第五阶段
  {
    TIMEFRAME: 152569,
    id: "113",
    cmd: "c2s_move",
    position: { x: 103.4, y: 9.4 }
  },
  // {
  //   TIMEFRAME: 180405,
  //   id: "113",
  //   cmd: "c2s_move",
  //   position: { x: 106, y: 10.2 }
  // },
  // {
  //   TIMEFRAME: 185442,
  //   id: "113",
  //   cmd: "c2s_move",
  //   position: { x: 110, y: 10.9 }
  // },
  {
    TIMEFRAME: 174777,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 43.53691939358984
  },

  { TIMEFRAME: 175886, id: "113", cmd: "c2s_aim" },
  { TIMEFRAME: 193500, id: "113", cmd: "c2s_attack" },

  { TIMEFRAME: 194361, id: "113", cmd: "c2s_carry" },
  {
    TIMEFRAME: 196003,
    id: "113",
    cmd: "c2s_move",
    position: { x: 116.9, y: 13.6 }
  },
  {
    TIMEFRAME: 200211,
    id: "113",
    cmd: "c2s_move",
    position: { x: 117.4, y: 14.2 }
  },

  {
    TIMEFRAME: 203289,
    id: "113",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 60.53854648756841
  },
  /** blues */

  /** 201廖信忠 蓝A */
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
  // 第一阶段
  {
    TIMEFRAME: 1725,
    id: "201",
    cmd: "c2s_move",
    position: { x: 119.5, y: 15.7 }
  },
  {
    TIMEFRAME: 18858,
    id: "201",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 302.3866601531817
  },
  {
    TIMEFRAME: 20113,
    id: "201",
    cmd: "c2s_move",
    position: { x: 104.7, y: 11.2 }
  },

  {
    TIMEFRAME: 29495,
    id: "201",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 400.4077357393534
  },
  // 第三阶段
  {
    TIMEFRAME: 101915,
    id: "201",
    cmd: "c2s_move",
    position: { x: 98.4, y: 32.1 }
  },
  {
    TIMEFRAME: 114222,
    id: "201",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 132.36285657073802
  },
  // 第五阶段

  // { TIMEFRAME: 129882, id: "201", cmd: "c2s_attack" },
  // {
  //   TIMEFRAME: 158286,
  //   id: "201",
  //   cmd: "c2s_move",
  //   position: { x: 93.8, y: 29.6 }
  // },

  // { TIMEFRAME: 161577, id: "201", cmd: "c2s_attack" },
  // { TIMEFRAME: 163739, id: "201", cmd: "c2s_attack" },
  // {
  //   TIMEFRAME: 166439,
  //   id: "201",
  //   cmd: "c2s_move",
  //   position: { x: 98.7, y: 32.9 }
  // },
  // {
  //   TIMEFRAME: 171376,
  //   id: "201",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 173.79515797257207
  // },
  // {
  //   TIMEFRAME: 176273,
  //   id: "201",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 452.8601917091621
  // },

  {
    TIMEFRAME: 181836,
    id: "201",
    cmd: "c2s_move",
    position: { x: 118.9, y: 15.2 }
  },
  // 被红E击毙
  { TIMEFRAME: 193500, id: "201", cmd: "c2s_hp", decrHp: 100 },

  /** 202蒋经纬 蓝B */
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
  // 第一阶段
  {
    TIMEFRAME: 1962,
    id: "202",
    cmd: "c2s_move",
    position: { x: 119, y: 16.4 }
  },
  {
    TIMEFRAME: 20763,
    id: "202",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 315.3879870436099
  },
  {
    TIMEFRAME: 22341,
    id: "202",
    cmd: "c2s_move",
    position: { x: 107.1, y: 22.2 }
  },
  {
    TIMEFRAME: 26608,
    id: "202",
    cmd: "c2s_move",
    position: { x: 105, y: 24.8 }
  },
  {
    TIMEFRAME: 34199,
    id: "202",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 49.34135224150225
  },
  // 第三阶段
  // {
  //   TIMEFRAME: 93711,
  //   id: "202",
  //   cmd: "c2s_move",
  //   position: { x: 100.3, y: 27.7 }
  // },
  // {
  //   TIMEFRAME: 96690,
  //   id: "202",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 10.732566923430738
  // },
  // {
  //   TIMEFRAME: 97850,
  //   id: "202",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 8.946157978259464
  // },
  // { TIMEFRAME: 98594, id: "202", cmd: "c2s_attack" },
  // { TIMEFRAME: 99982, id: "202", cmd: "c2s_attack" },
  // { TIMEFRAME: 104857, id: "202", cmd: "c2s_attack" },
  // { TIMEFRAME: 109729, id: "202", cmd: "c2s_attack" },
  {
    TIMEFRAME: 114981,
    id: "202",
    cmd: "c2s_move",
    position: { x: 98.3, y: 38.8 }
  },
  {
    TIMEFRAME: 114606,
    id: "202",
    cmd: "c2s_move",
    position: { x: 99.5, y: 41.8 }
  },
  {
    TIMEFRAME: 114981,
    id: "202",
    cmd: "c2s_move",
    position: { x: 98.3, y: 38.8 }
  },
  {
    TIMEFRAME: 120601,
    id: "202",
    cmd: "c2s_move",
    position: { x: 97.9, y: 45.9 }
  },
  {
    TIMEFRAME: 128829,
    id: "202",
    cmd: "c2s_move",
    position: { x: 95.8, y: 61.1 }
  },
  {
    TIMEFRAME: 129471,
    id: "202",
    cmd: "c2s_move",
    position: { x: 96.9, y: 61.2 }
  },
  {
    TIMEFRAME: 137694,
    id: "202",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 52.934953995996096
  },
  // 第5阶段回防
  {
    TIMEFRAME: 192471,
    id: "202",
    cmd: "c2s_move",
    position: { x: 120.1, y: 49.2 }
  },
  // 被101击毙
  { TIMEFRAME: 206981, id: "202", cmd: "c2s_hp", decrHp: 40 },
  { TIMEFRAME: 208981, id: "202", cmd: "c2s_hp", decrHp: 60 },

  /** 212王爱国 蓝C */
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
  // 第一阶段
  { TIMEFRAME: 1220, id: "212", cmd: "c2s_move", position: { x: 97, y: 65.3 } },
  {
    TIMEFRAME: 16882,
    id: "212",
    cmd: "c2s_move",
    position: { x: 78.8, y: 64.1 }
  },
  {
    TIMEFRAME: 28864,
    id: "212",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 411.6633526277419
  },
  // 第二阶段
  {
    TIMEFRAME: 30167,
    id: "212",
    cmd: "c2s_move",
    position: { x: 74, y: 51.7 }
  },
  {
    TIMEFRAME: 38554,
    id: "212",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 310.95041829672994
  },
  {
    TIMEFRAME: 41086,
    id: "212",
    cmd: "c2s_move",
    position: { x: 78.5, y: 64 }
  },
  {
    TIMEFRAME: 48892,
    id: "212",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 203.33220916020704
  },
  // {
  //   TIMEFRAME: 51117,
  //   id: "212",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 235.8769274107421
  // },
  // { TIMEFRAME: 52499, id: "212", cmd: "c2s_attack" },
  // {
  //   TIMEFRAME: 54743,
  //   id: "212",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 120.20841757063369
  // },
  {
    TIMEFRAME: 58487,
    id: "212",
    cmd: "c2s_move",
    position: { x: 73.9, y: 51.6 }
  },
  {
    TIMEFRAME: 66612,
    id: "212",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 321.4006515681866
  },
  {
    TIMEFRAME: 74452,
    id: "212",
    cmd: "c2s_move",
    position: { x: 78.5, y: 64 }
  },
  {
    TIMEFRAME: 82912,
    id: "212",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 205
  },
  // 第四阶段
  {
    TIMEFRAME: 97055,
    id: "212",
    cmd: "c2s_move",
    position: { x: 76, y: 61.9 }
  },
  {
    TIMEFRAME: 97174,
    id: "212",
    cmd: "c2s_attack"
  },
  // 被围剿击毙
  { TIMEFRAME: 97555, id: "212", cmd: "c2s_hp", decrHp: 40 },
  { TIMEFRAME: 99248, id: "212", cmd: "c2s_hp", decrHp: 60 },

  /** 213陈建忠 蓝D */
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
  // 第一阶段
  {
    TIMEFRAME: 1314,
    id: "213",
    cmd: "c2s_move",
    position: { x: 95.8, y: 90.2 }
  },
  // 第二阶段
  // {
  //   TIMEFRAME: 38385,
  //   id: "213",
  //   cmd: "c2s_move",
  //   position: { x: 92.1, y: 93.4 }
  // },
  // {
  //   TIMEFRAME: 42752,
  //   id: "213",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 354.44558250564063
  // },
  // { TIMEFRAME: 44221, id: "213", cmd: "c2s_attack" },
  // { TIMEFRAME: 47166, id: "213", cmd: "c2s_attack" },
  // {
  //   TIMEFRAME: 52129,
  //   id: "213",
  //   cmd: "c2s_move",
  //   position: { x: 96.1, y: 90 }
  // },
  // {
  //   TIMEFRAME: 55102,
  //   id: "213",
  //   cmd: "c2s_rotation",
  //   direct: 1,
  //   angle: 183.16973038798787
  // },
  {
    TIMEFRAME: 63329,
    id: "213",
    cmd: "c2s_move",
    position: { x: 95.9, y: 85.3 }
  },
  {
    TIMEFRAME: 65755,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 308.6904859842552
  },
  {
    TIMEFRAME: 70164,
    id: "213",
    cmd: "c2s_move",
    position: { x: 95.7, y: 90.6 }
  },
  {
    TIMEFRAME: 73016,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 52.89325611176761
  },
  { TIMEFRAME: 79293, id: "213", cmd: "c2s_attack" },
  { TIMEFRAME: 82578, id: "213", cmd: "c2s_attack" },
  { TIMEFRAME: 85344, id: "213", cmd: "c2s_attack" },
  // 第四阶段
  {
    TIMEFRAME: 100752,
    id: "213",
    cmd: "c2s_move",
    position: { x: 96, y: 85.5 }
  },
  {
    TIMEFRAME: 104098,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 301.25341927916935
  },
  { TIMEFRAME: 106464, id: "213", cmd: "c2s_move", position: { x: 96, y: 91 } },
  {
    TIMEFRAME: 109152,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 35.9390732746769
  },
  {
    TIMEFRAME: 119750,
    id: "213",
    cmd: "c2s_move",
    position: { x: 95.9, y: 85.1 }
  },
  {
    TIMEFRAME: 123407,
    id: "213",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 309.63083018517136
  },

  /** 206康有为 蓝E */
  // 武器就绪
  {
    TIMEFRAME: 100,
    id: "206",
    cmd: "c2s_switch_weapon",
    weapon_index: 3
  },
  { TIMEFRAME: 200, id: "206", cmd: "c2s_load_ammunition" },
  { TIMEFRAME: 500, id: "206", cmd: "c2s_aim" },
  { TIMEFRAME: 800, id: "206", cmd: "c2s_carry" },
  // 第一阶段
  {
    TIMEFRAME: 1237,
    id: "206",
    cmd: "c2s_move",
    position: { x: 120.3, y: 60.9 }
  },
  {
    TIMEFRAME: 5040,
    id: "206",
    cmd: "c2s_move",
    position: { x: 97.2, y: 51.7 }
  },
  {
    TIMEFRAME: 20881,
    id: "206",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 305.5871332892772
  },
  // 第五阶段回防
  {
    TIMEFRAME: 192500,
    id: "206",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 429.5871332892772
  },
  {
    TIMEFRAME: 193881,
    id: "206",
    cmd: "c2s_rotation",
    direct: 1,
    angle: 104.5871332892772
  },
  {
    TIMEFRAME: 198881,
    id: "206",
    cmd: "c2s_move",
    position: { x: 115.4, y: 62.5 }
  },
  // 被103击毙
  { TIMEFRAME: 202981, id: "206", cmd: "c2s_hp", decrHp: 40 },
  { TIMEFRAME: 204981, id: "206", cmd: "c2s_hp", decrHp: 60 }
];
