const UnitFight = {
  version: "0.3.0",
  scope: "tree",
  id: "5139a508-3480-471d-a399-501126e6aba0",
  title: "播放战报",
  description: "只是个播放战报的行为树",
  root: "b3b6d643-930d-4964-bf19-6d7349e0fb08",
  properties: {},
  nodes: {
    "b3b6d643-930d-4964-bf19-6d7349e0fb08": {
      id: "b3b6d643-930d-4964-bf19-6d7349e0fb08",
      name: "Priority",
      title: "Priority",
      description: "",
      properties: {},
      display: {
        x: -480,
        y: -84
      },
      children: [
        "ae170d9f-4945-4f3e-8f42-a10b2b88957f",
        "32df125d-8b92-4766-8682-0bdbd5126be2",
        "31057ca7-1798-4961-9fc5-f42e33f2153a",
        "b9428cf8-6ce9-4baa-80ef-e4ffd773c20a",
        "1b726380-655f-43b7-8ad1-807ca90c9718"
      ]
    },
    "8a9243f4-5dec-40b8-843e-e23ab11a0e1d": {
      id: "8a9243f4-5dec-40b8-843e-e23ab11a0e1d",
      name: "StatuCode",
      title: "StatuCode",
      description:
        "判断状态码\n-- (状态码\n     rf(播放攻击动画)\n     rs(播放技能动画)\n     f(攻击成功)\n     s(技能成功)\n     v(单挑)\n     ss(战术)\n     b(buff)\n     bup(buff刷新)\n     pk(单挑)\n     upb(刷新波数)\n     mv(作战单位移动)\n     arr(整理队形)\n     over(游戏结束)\n)",
      properties: {
        status: "f"
      },
      display: {
        x: -192,
        y: -300
      }
    },
    "ae170d9f-4945-4f3e-8f42-a10b2b88957f": {
      id: "ae170d9f-4945-4f3e-8f42-a10b2b88957f",
      name: "Sequence",
      title: "Sequence",
      description: "",
      properties: {},
      display: {
        x: -348,
        y: -276
      },
      children: [
        "8a9243f4-5dec-40b8-843e-e23ab11a0e1d",
        "b2e730b8-de2e-45c6-8ece-f0f56f28bec7"
      ]
    },
    "b2e730b8-de2e-45c6-8ece-f0f56f28bec7": {
      id: "b2e730b8-de2e-45c6-8ece-f0f56f28bec7",
      name: "UnitAttack",
      title: "UnitAttack",
      description: "UnitAttack\n作战单位的普通攻击",
      properties: {},
      display: {
        x: -192,
        y: -252
      }
    },
    "32df125d-8b92-4766-8682-0bdbd5126be2": {
      id: "32df125d-8b92-4766-8682-0bdbd5126be2",
      name: "Sequence",
      title: "Sequence",
      description: "",
      properties: {},
      display: {
        x: -348,
        y: -156
      },
      children: [
        "f2e6645a-9fb9-4b49-86d2-3eb8e75e4f9e",
        "7305fabd-11fc-493a-827b-6bca2f40d877"
      ]
    },
    "f2e6645a-9fb9-4b49-86d2-3eb8e75e4f9e": {
      id: "f2e6645a-9fb9-4b49-86d2-3eb8e75e4f9e",
      name: "StatuCode",
      title: "StatuCode",
      description:
        "判断状态码\n-- (状态码\n     rf(播放攻击动画)\n     rs(播放技能动画)\n     f(攻击成功)\n     s(技能成功)\n     v(单挑)\n     ss(战术)\n     b(buff)\n     bup(buff刷新)\n     pk(单挑)\n     upb(刷新波数)\n     mv(作战单位移动)\n     arr(整理队形)\n     over(游戏结束)\n)",
      properties: {
        status: "mv"
      },
      display: {
        x: -192,
        y: -180
      }
    },
    "7305fabd-11fc-493a-827b-6bca2f40d877": {
      id: "7305fabd-11fc-493a-827b-6bca2f40d877",
      name: "UnitMove",
      title: "UnitMove",
      description: "UnitMove\n作战单位移动",
      properties: {},
      display: {
        x: -192,
        y: -132
      }
    },
    "cb289c2f-1d3c-4ebd-8968-11ac2278c995": {
      id: "cb289c2f-1d3c-4ebd-8968-11ac2278c995",
      name: "StatuCode",
      title: "StatuCode",
      description:
        "判断状态码\n-- (状态码\n     rf(播放攻击动画)\n     rs(播放技能动画)\n     f(攻击成功)\n     s(技能成功)\n     v(单挑)\n     ss(战术)\n     b(buff)\n     bup(buff刷新)\n     pk(单挑)\n     upb(刷新波数)\n     mv(作战单位移动)\n     arr(整理队形)\n     over(游戏结束)\n)",
      properties: {
        status: "rf"
      },
      display: {
        x: -192,
        y: -60
      }
    },
    "31057ca7-1798-4961-9fc5-f42e33f2153a": {
      id: "31057ca7-1798-4961-9fc5-f42e33f2153a",
      name: "Sequence",
      title: "Sequence",
      description: "",
      properties: {},
      display: {
        x: -348,
        y: -36
      },
      children: [
        "cb289c2f-1d3c-4ebd-8968-11ac2278c995",
        "419d48b5-58d0-4ea5-879c-dd2b13b681fc"
      ]
    },
    "419d48b5-58d0-4ea5-879c-dd2b13b681fc": {
      id: "419d48b5-58d0-4ea5-879c-dd2b13b681fc",
      name: "UnitAnimation",
      title: "UnitAnimation",
      description: "UnitAnimation\n作战单位播放动画",
      properties: {},
      display: {
        x: -192,
        y: -12
      }
    },
    "b9428cf8-6ce9-4baa-80ef-e4ffd773c20a": {
      id: "b9428cf8-6ce9-4baa-80ef-e4ffd773c20a",
      name: "Sequence",
      title: "Sequence",
      description: "",
      properties: {},
      display: {
        x: -348,
        y: 84
      },
      children: [
        "d5b8e84d-cc81-4fa3-92cc-9b84a94ba0d1",
        "e96bd6f9-9538-4a1c-8f0e-679bc567a34f"
      ]
    },
    "d5b8e84d-cc81-4fa3-92cc-9b84a94ba0d1": {
      id: "d5b8e84d-cc81-4fa3-92cc-9b84a94ba0d1",
      name: "StatuCode",
      title: "StatuCode",
      description:
        "判断状态码\n-- (状态码\n     rf(播放攻击动画)\n     rs(播放技能动画)\n     f(攻击成功)\n     s(技能成功)\n     v(单挑)\n     ss(战术)\n     b(buff)\n     bup(buff刷新)\n     pk(单挑)\n     upb(刷新波数)\n     mv(作战单位移动)\n     arr(整理队形)\n     over(游戏结束)\n)",
      properties: {
        status: "s"
      },
      display: {
        x: -192,
        y: 60
      }
    },
    "e96bd6f9-9538-4a1c-8f0e-679bc567a34f": {
      id: "e96bd6f9-9538-4a1c-8f0e-679bc567a34f",
      name: "UnitSkill",
      title: "UnitSkill",
      description: "UnitSkill\n作战单位技能",
      properties: {},
      display: {
        x: -192,
        y: 108
      }
    },
    "1b726380-655f-43b7-8ad1-807ca90c9718": {
      id: "1b726380-655f-43b7-8ad1-807ca90c9718",
      name: "OtherAction",
      title: "OtherAction",
      description: "OtherAction\n其他的状态码，直接使用这个动作",
      properties: {},
      display: {
        x: -288,
        y: 228
      }
    }
  },
  display: {
    camera_x: 960,
    camera_y: 489,
    camera_z: 1,
    x: -576,
    y: -84
  },
  custom_nodes: [
    {
      version: "0.3.0",
      scope: "node",
      name: "StatuCode",
      category: "condition",
      title: "StatuCode",
      description:
        "判断状态码\n-- (状态码\n     rf(播放攻击动画)\n     rs(播放技能动画)\n     f(攻击成功)\n     s(技能成功)\n     v(单挑)\n     ss(战术)\n     b(buff)\n     bup(buff刷新)\n     pk(单挑)\n     upb(刷新波数)\n     mv(作战单位移动)\n     arr(整理队形)\n     over(游戏结束)\n)",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "UnitAttack",
      category: "action",
      title: "UnitAttack",
      description: "UnitAttack\n作战单位的普通攻击",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "UnitMove",
      category: "action",
      title: "UnitMove",
      description: "UnitMove\n作战单位移动",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "UnitAnimation",
      category: "action",
      title: "UnitAnimation",
      description: "UnitAnimation\n作战单位播放动画",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "UnitSkill",
      category: "action",
      title: "UnitSkill",
      description: "UnitSkill\n作战单位技能",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "OtherAction",
      category: "action",
      title: "OtherAction",
      description: "OtherAction\n其他的状态码，直接使用这个动作",
      properties: {}
    }
  ]
};

export default UnitFight;
