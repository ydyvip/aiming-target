export const actionRecords = [
  // reds
  {
    // 112赵八一 C
    topic: "actor",
    id: "112",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "112",
        cmd: "c2s_move",
        index: 0,
        position: { x: 18, y: 52.2 }
      },
      {
        id: "112",
        cmd: "c2s_move",
        index: 1,
        position: { x: 33.2, y: 51.1 }
      },
      {
        id: "112",
        cmd: "c2s_move",
        index: 2,
        position: { x: 53.439201451905625, y: 49.66424682395644 }
      }
    ]
  },
  {
    // 113陈卫国 C
    topic: "actor",
    id: "113",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "113",
        index: 0,
        cmd: "c2s_move",
        position: { x: 17.6, y: 49.9 }
      },
      {
        id: "113",
        cmd: "c2s_move",
        index: 1,
        position: { x: 32.9, y: 49.4 }
      },
      {
        id: "113",
        cmd: "c2s_move",
        index: 2,
        position: { x: 51.43375680580762, y: 47.422867513611614 }
      },
      // 发现蓝方巡逻队员A-廖信忠
      {
        id: "113",
        cmd: "c2s_switch_weapon",
        index: 3,
        weapon_index: 3
      },
      { id: "113", cmd: "c2s_load_ammunition", index: 4 },
      { id: "113", cmd: "c2s_aim", index: 5 },

      { id: "113", cmd: "c2s_attack", index: 6 },
      { id: "113", cmd: "c2s_attack", index: 7 },
      { id: "113", cmd: "c2s_attack", index: 8 }
    ]
  },
  {
    // 101张晓北 A
    topic: "actor",
    id: "101",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "101",
        cmd: "c2s_move",
        index: 0,
        position: { x: 12.50453720508167, y: 36.098003629764065 }
      },
      {
        id: "101",
        cmd: "c2s_move",
        index: 1,
        position: { x: 31.497277676950997, y: 24.891107078039926 }
      },
      {
        id: "101",
        cmd: "c2s_move",
        index: 2,
        position: { x: 31.02540834845735, y: 14.39201451905626 }
      },
      {
        id: "101",
        cmd: "c2s_move",
        index: 3,
        position: { x: 31.02540834845735, y: 14.39201451905626 }
      },
      {
        id: "101",
        cmd: "c2s_move",
        index: 4,
        position: { x: 63.70235934664247, y: 10.14519056261343 }
      },
      {
        id: "101",
        cmd: "c2s_rotation",
        index: 5,
        direct: 1,
        angle: 94.9697407281103
      },
      // 战术回拢乘胜追击
      {
        id: "101",
        cmd: "c2s_move",
        index: 16,
        position: { x: 102.11996713229252, y: 8.75924404272802 }
      }
    ]
  },
  {
    // 105陈建党 D
    topic: "actor",
    id: "105",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "105",
        cmd: "c2s_move",
        index: 0,
        position: { x: 3.6, y: 70.9 }
      },
      {
        id: "105",
        cmd: "c2s_move",
        index: 1,
        position: { x: 19.228675136116152, y: 80.57168784029038 }
      },
      {
        id: "105",
        cmd: "c2s_move",
        index: 2,
        position: { x: 33.8, y: 96.1 }
      },
      {
        id: "105",
        cmd: "c2s_move",
        index: 3,
        position: { x: 57.7, y: 93 }
      },
      {
        id: "105",
        cmd: "c2s_rotation",
        index: 4,
        direct: 4,
        angle: 40
      },
      // 发现蓝方巡逻队员-SB林胜利
      {
        id: "105",
        cmd: "c2s_switch_weapon",
        index: 7,
        weapon_index: 3
      },
      { id: "105", cmd: "c2s_load_ammunition", index: 8 },
      { id: "105", cmd: "c2s_aim", index: 9 },

      { id: "105", cmd: "c2s_attack", index: 10 },
      { id: "105", cmd: "c2s_attack", index: 11 },
      { id: "105", cmd: "c2s_attack", index: 12 },
      // 第15步被击伤
      {
        id: "105",
        cmd: "c2s_hp",
        index: 15,
        decrHp: 40
      },
      // 战术回拢乘胜追击
      {
        id: "105",
        cmd: "c2s_move",
        index: 16,
        position: { x: 95.39030402629416, y: 93.8948233360723 }
      },
      // 击毙SA
      { id: "105", cmd: "c2s_load_ammunition", index: 17 },
      { id: "105", cmd: "c2s_attack", index: 18 },
      { id: "105", cmd: "c2s_attack", index: 19 }
    ]
  },
  {
    // 115谢维和 B
    topic: "actor",
    id: "115",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "115",
        cmd: "c2s_move",
        index: 0,
        position: { x: 4.364791288566243, y: 51.31578947368421 }
      },
      {
        id: "115",
        cmd: "c2s_move",
        index: 1,
        position: { x: 38.92921960072595, y: 46.597096188747734 }
      },
      {
        id: "115",
        cmd: "c2s_move",
        index: 2,
        position: { x: 38.69328493647913, y: 31.73321234119782 }
      },
      {
        id: "115",
        cmd: "c2s_move",
        index: 3,
        position: { x: 50.490018148820326, y: 30.671506352087114 }
      },
      {
        id: "115",
        cmd: "c2s_move",
        index: 4,
        position: { x: 58.74773139745916, y: 31.02540834845735 }
      },
      // 战术回拢乘胜追击
      {
        id: "115",
        cmd: "c2s_move",
        index: 16,
        position: { x: 96.24486442070665, y: 29.055053410024648 }
      },
      {
        id: "115",
        cmd: "c2s_switch_weapon",
        index: 17,
        weapon_index: 3
      },
      { id: "115", cmd: "c2s_load_ammunition", index: 18 },
      { id: "115", cmd: "c2s_aim", index: 19 },

      { id: "115", cmd: "c2s_attack", index: 20 },
      // 第21步被击毙
      {
        id: "115",
        cmd: "c2s_hp",
        index: 21,
        decrHp: 100
      }
    ]
  },

  // blues
  {
    // 213陈建忠 SA
    topic: "actor",
    id: "213",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "213",
        cmd: "c2s_move",
        index: 0,
        position: { x: 111.19967132292523, y: 13.459326211996713 }
      },
      {
        id: "213",
        cmd: "c2s_move",
        index: 1,
        position: { x: 102.22678718159408, y: 43.26211996713229 }
      },
      // 战术回拢
      {
        id: "213",
        cmd: "c2s_move",
        index: 16,
        position: { x: 95.8175842235004, y: 28.841413311421526 }
      },
      // 第19步被击毙
      {
        id: "213",
        cmd: "c2s_hp",
        index: 19,
        decrHp: 100
      }
    ]
  },
  {
    // 202蒋经纬 B
    topic: "actor",
    id: "202",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "202",
        cmd: "c2s_move",
        index: 0,
        position: { x: 107.58620689655173, y: 12.622504537205081 }
      },
      // 战术回拢
      {
        id: "202",
        cmd: "c2s_move",
        index: 16,
        position: { x: 105.53820870994248, y: 43.475760065735415 }
      },
      {
        id: "202",
        cmd: "c2s_switch_weapon",
        index: 17,
        weapon_index: 3
      },
      { id: "202", cmd: "c2s_load_ammunition", index: 18 },
      { id: "202", cmd: "c2s_aim", index: 19 },

      { id: "202", cmd: "c2s_attack", index: 20 },
      // 第21步被击毙
      {
        id: "202",
        cmd: "c2s_hp",
        index: 21,
        decrHp: 100
      }
    ]
  },
  {
    // 215林胜利 SB
    topic: "actor",
    id: "215",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "215",
        cmd: "c2s_move",
        index: 0,
        position: { x: 103.18816762530813, y: 65.8011503697617 }
      },
      {
        id: "215",
        cmd: "c2s_move",
        index: 8,
        position: { x: 92.29252259654889, y: 66.12161051766638 }
      },
      {
        id: "215",
        cmd: "c2s_move",
        index: 9,
        position: { x: 79.26047658175843, y: 66.54889071487264 }
      },
      {
        id: "215",
        cmd: "c2s_move",
        index: 10,
        position: { x: 78.7263763352506, y: 77.97863599013968 }
      },
      {
        id: "215",
        cmd: "c2s_move",
        index: 11,
        position: { x: 72.74445357436318, y: 92.71980279375514 }
      },
      // 第12步被击毙
      {
        id: "215",
        cmd: "c2s_hp",
        index: 12,
        decrHp: 100
      }
    ]
  },
  {
    // 212王爱国 C
    topic: "actor",
    id: "212",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "212",
        cmd: "c2s_move",
        index: 0,
        position: { x: 97.67695099818512, y: 90.36297640653358 }
      },
      // 听见枪声
      {
        id: "212",
        cmd: "c2s_move",
        index: 11,
        position: { x: 92.18570254724733, y: 94.00164338537387 }
      },
      // 击伤红方张晓北
      {
        id: "212",
        cmd: "c2s_switch_weapon",
        index: 12,
        weapon_index: 3
      },
      { id: "212", cmd: "c2s_load_ammunition", index: 13 },
      { id: "212", cmd: "c2s_aim", index: 14 },

      { id: "212", cmd: "c2s_attack", index: 15 },
      // 战术回拢
      {
        id: "212",
        cmd: "c2s_move",
        index: 16,
        position: { x: 98.27444535743632, y: 51.914543960558746 }
      },
      // 第22步被击毙
      {
        id: "212",
        cmd: "c2s_hp",
        index: 22,
        decrHp: 100
      }
    ]
  },
  {
    // 201廖信忠
    topic: "actor",
    id: "201",
    cmd: "c2s_commands",
    cmds: [
      {
        id: "201",
        cmd: "c2s_move",
        index: 0,
        position: { x: 85.88021778584393, y: 49.310344827586206 }
      },
      // 第8步被击毙
      {
        id: "201",
        cmd: "c2s_hp",
        index: 8,
        decrHp: 100
      }
    ]
  }
];
