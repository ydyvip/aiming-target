const UnitFightAttack = {
  version: "0.3.0",
  scope: "project",
  selectedTree: "7620f609-38c0-40e2-80a5-dcfdd3e421a9",
  trees: [
    {
      version: "0.3.0",
      scope: "tree",
      id: "7620f609-38c0-40e2-80a5-dcfdd3e421a9",
      title: "A behavior tree",
      description: "",
      root: "3b9f7b25-839a-4fed-9e4f-9e896aa7be86",
      properties: {},
      nodes: {
        "3b9f7b25-839a-4fed-9e4f-9e896aa7be86": {
          id: "3b9f7b25-839a-4fed-9e4f-9e896aa7be86",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: 360,
            y: -288
          },
          children: [
            "9c3ac03c-a6ad-420a-8095-c54a96800eec",
            "b428f4de-7cf8-4466-8729-df202983e0a5"
          ]
        },
        "ea7a2c62-d250-4016-873b-e56e87a7053b": {
          id: "ea7a2c62-d250-4016-873b-e56e87a7053b",
          name: "NeedAmmo",
          title: "NeedAmmo",
          description:
            "判断 Ammunition 值是否空了\n无弹药返回 success\n有弹药返回 failure",
          properties: {},
          display: {
            x: -408,
            y: 108
          }
        },
        "9c3ac03c-a6ad-420a-8095-c54a96800eec": {
          id: "9c3ac03c-a6ad-420a-8095-c54a96800eec",
          name: "IsAlive",
          title: "IsAlive",
          description: "判断作战单位是否还活着",
          properties: {},
          display: {
            x: -108,
            y: -132
          }
        },
        "74047aee-d956-45f0-89e6-f8004adacfb3": {
          id: "74047aee-d956-45f0-89e6-f8004adacfb3",
          name: "LoadAmmo",
          title: "LoadAmmo",
          description: "填装弹药",
          properties: {},
          display: {
            x: -228,
            y: 108
          }
        },
        "0a831682-6aac-40e5-846c-bc6765f548ae": {
          id: "0a831682-6aac-40e5-846c-bc6765f548ae",
          name: "Attack",
          title: "Attack",
          description: "进行攻击动作",
          properties: {},
          display: {
            x: 864,
            y: 108
          }
        },
        "b428f4de-7cf8-4466-8729-df202983e0a5": {
          id: "b428f4de-7cf8-4466-8729-df202983e0a5",
          name: "Priority",
          title: "Priority",
          description: "",
          properties: {},
          display: {
            x: 444,
            y: -132
          },
          children: [
            "9bcadf3c-6e77-4b47-bfb6-6eec2836523a",
            "00d90d58-be2d-4e7f-82c6-1314dcb709a8",
            "a3009045-0bff-4d8c-b0dc-be99c0cda448",
            "9aa1dea8-4069-42f8-9ec6-d34fb3e71f8f"
          ]
        },
        "0eb87920-be85-467d-8bcc-7a84fb298676": {
          id: "0eb87920-be85-467d-8bcc-7a84fb298676",
          name: "CanAttack",
          title: "CanAttack",
          description: "满足攻击条件",
          properties: {},
          display: {
            x: 540,
            y: 108
          }
        },
        "a3009045-0bff-4d8c-b0dc-be99c0cda448": {
          id: "a3009045-0bff-4d8c-b0dc-be99c0cda448",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: 624,
            y: -12
          },
          children: [
            "cd027ba6-5134-4a1b-8bba-9cba524eec02",
            "0eb87920-be85-467d-8bcc-7a84fb298676",
            "6719a3c8-265b-447a-9f29-a17f90926a58",
            "0a831682-6aac-40e5-846c-bc6765f548ae"
          ]
        },
        "9bcadf3c-6e77-4b47-bfb6-6eec2836523a": {
          id: "9bcadf3c-6e77-4b47-bfb6-6eec2836523a",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: -420,
            y: 0
          },
          children: [
            "372380bf-59c9-4a9e-8f03-ecea994853c9",
            "ea7a2c62-d250-4016-873b-e56e87a7053b",
            "74047aee-d956-45f0-89e6-f8004adacfb3"
          ]
        },
        "6719a3c8-265b-447a-9f29-a17f90926a58": {
          id: "6719a3c8-265b-447a-9f29-a17f90926a58",
          name: "Priority",
          title: "Priority",
          description: "",
          properties: {},
          display: {
            x: 696,
            y: 108
          },
          children: [
            "f1f6dd16-95ee-482e-8fb5-6f006028718e",
            "a8274a65-acad-4fc3-8116-8e898a8d08f5"
          ]
        },
        "590a4ca8-0096-4cba-8e31-4add99b3bd17": {
          id: "590a4ca8-0096-4cba-8e31-4add99b3bd17",
          name: "OutOfRange",
          title: "OutOfRange",
          description: "判断是否超出射程\n超出返回 failure\n没超出返回 success",
          properties: {},
          display: {
            x: 612,
            y: 372
          }
        },
        "a8274a65-acad-4fc3-8116-8e898a8d08f5": {
          id: "a8274a65-acad-4fc3-8116-8e898a8d08f5",
          name: "NpcMove",
          title: "NpcMove",
          description:
            "作战单位移动\n一般是攻击的对象在射程范围之外，需要移动一定的距离，去进行攻击",
          properties: {},
          display: {
            x: 780,
            y: 240
          }
        },
        "f1f6dd16-95ee-482e-8fb5-6f006028718e": {
          id: "f1f6dd16-95ee-482e-8fb5-6f006028718e",
          name: "Inverter",
          title: "Inverter",
          description: "",
          properties: {},
          display: {
            x: 612,
            y: 240
          },
          child: "590a4ca8-0096-4cba-8e31-4add99b3bd17"
        },
        "551fcd29-f6a7-4f9e-8255-ea22b41fdea1": {
          id: "551fcd29-f6a7-4f9e-8255-ea22b41fdea1",
          name: "SwitchWeapon",
          title: "SwitchWeapon",
          description: "0:空手\n1:刀\n2:手枪\n3:步枪或狙击",
          properties: {
            weaponIndex: 2
          },
          display: {
            x: 156,
            y: 108
          }
        },
        "372380bf-59c9-4a9e-8f03-ecea994853c9": {
          id: "372380bf-59c9-4a9e-8f03-ecea994853c9",
          name: "HasWeapon",
          title: "HasWeapon",
          description:
            "HAND: 手\nKNIFE:刀\nPISTOL: 手枪\nRIFLE: 步枪\n逗号分割多种武器",
          properties: {
            weaponTypes: "PISTOL,RIFLE"
          },
          display: {
            x: -600,
            y: 108
          }
        },
        "00d90d58-be2d-4e7f-82c6-1314dcb709a8": {
          id: "00d90d58-be2d-4e7f-82c6-1314dcb709a8",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: 60,
            y: -12
          },
          children: [
            "7c6b8253-a9ba-49e9-bd13-1ce17d75aac0",
            "551fcd29-f6a7-4f9e-8255-ea22b41fdea1"
          ]
        },
        "6eb39861-6e76-4744-b01d-bbc55a04c24d": {
          id: "6eb39861-6e76-4744-b01d-bbc55a04c24d",
          name: "HasWeapon",
          title: "HasWeapon",
          description:
            "HAND: 手\nKNIFE:刀\nPISTOL: 手枪\nRIFLE: 步枪\n逗号分割多种武器",
          properties: {
            weaponTypes: "PISTOL"
          },
          display: {
            x: -36,
            y: 252
          }
        },
        "7c6b8253-a9ba-49e9-bd13-1ce17d75aac0": {
          id: "7c6b8253-a9ba-49e9-bd13-1ce17d75aac0",
          name: "Inverter",
          title: "Inverter",
          description: "",
          properties: {},
          display: {
            x: -36,
            y: 120
          },
          child: "6eb39861-6e76-4744-b01d-bbc55a04c24d"
        },
        "9aa1dea8-4069-42f8-9ec6-d34fb3e71f8f": {
          id: "9aa1dea8-4069-42f8-9ec6-d34fb3e71f8f",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: 1284,
            y: -24
          },
          children: [
            "778087ce-b7f9-463d-bdce-aa95157b7b54",
            "c5d7d642-24cc-4664-8d03-1e15f2ab4e08",
            "bd1226f7-2074-45fe-947a-dc98940cf13f",
            "08b7cd23-aa75-4182-8566-8460c394aa43"
          ]
        },
        "f5a7e7f7-8d3f-405f-a524-6bbd53bdba17": {
          id: "f5a7e7f7-8d3f-405f-a524-6bbd53bdba17",
          name: "IsMoving",
          title: "IsMoving",
          description: "是否在移动",
          properties: {},
          display: {
            x: 1032,
            y: 240
          }
        },
        "778087ce-b7f9-463d-bdce-aa95157b7b54": {
          id: "778087ce-b7f9-463d-bdce-aa95157b7b54",
          name: "Inverter",
          title: "Inverter",
          description: "",
          properties: {},
          display: {
            x: 1032,
            y: 120
          },
          child: "f5a7e7f7-8d3f-405f-a524-6bbd53bdba17"
        },
        "08b7cd23-aa75-4182-8566-8460c394aa43": {
          id: "08b7cd23-aa75-4182-8566-8460c394aa43",
          name: "RandomSelectors",
          title: "RandomSelectors",
          description: "",
          properties: {},
          display: {
            x: 1500,
            y: 108
          },
          children: [
            "953cf324-20fb-455a-809c-13f696537652",
            "dfbb3156-806d-4bf3-bf43-8f135a854fad"
          ]
        },
        "953cf324-20fb-455a-809c-13f696537652": {
          id: "953cf324-20fb-455a-809c-13f696537652",
          name: "Rotation",
          title: "Turn left",
          description: "左转100度",
          properties: {
            direct: 0,
            angle: 100
          },
          display: {
            x: 1404,
            y: 240
          }
        },
        "dfbb3156-806d-4bf3-bf43-8f135a854fad": {
          id: "dfbb3156-806d-4bf3-bf43-8f135a854fad",
          name: "Rotation",
          title: "Turn right",
          description: "右转100度",
          properties: {
            direct: 1,
            angle: 100
          },
          display: {
            x: 1620,
            y: 240
          }
        },
        "bd1226f7-2074-45fe-947a-dc98940cf13f": {
          id: "bd1226f7-2074-45fe-947a-dc98940cf13f",
          name: "Wait",
          title: "Wait <milliseconds>ms",
          description: "",
          properties: {
            milliseconds: 5000
          },
          display: {
            x: 1368,
            y: 108
          }
        },
        "c5d7d642-24cc-4664-8d03-1e15f2ab4e08": {
          id: "c5d7d642-24cc-4664-8d03-1e15f2ab4e08",
          name: "Inverter",
          title: "Inverter",
          description: "",
          properties: {},
          display: {
            x: 1200,
            y: 120
          },
          child: "884ad3fd-6192-4c8d-b773-84ef62d95ebb"
        },
        "884ad3fd-6192-4c8d-b773-84ef62d95ebb": {
          id: "884ad3fd-6192-4c8d-b773-84ef62d95ebb",
          name: "FoundEnemy",
          title: "FoundEnemy",
          description: "发现目标",
          properties: {},
          display: {
            x: 1200,
            y: 240
          }
        },
        "cd027ba6-5134-4a1b-8bba-9cba524eec02": {
          id: "cd027ba6-5134-4a1b-8bba-9cba524eec02",
          name: "FoundEnemy",
          title: "FoundEnemy",
          description: "发现目标",
          properties: {},
          display: {
            x: 360,
            y: 108
          }
        }
      },
      display: {
        camera_x: 56.55000003174064,
        camera_y: 401.1650000271329,
        camera_z: 1,
        x: 360,
        y: -432
      }
    }
  ],
  custom_nodes: [
    {
      version: "0.3.0",
      scope: "node",
      name: "Attack",
      category: "action",
      title: "Attack",
      description: "进行攻击动作",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "OppositeIsAlive",
      category: "condition",
      title: "OppositeIsAlive",
      description: "判断对位的作战单位是否还活着",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "OutOfRange",
      category: "condition",
      title: "OutOfRange",
      description: "判断是否超出射程\n超出返回 failure\n没超出返回 success",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "NpcMove",
      category: "action",
      title: "NpcMove",
      description:
        "作战单位移动\n一般是攻击的对象在射程范围之外，需要移动一定的距离，去进行攻击",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "IsAlive",
      category: "condition",
      title: "IsAlive",
      description: "判断作战单位是否还活着",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "LoadAmmo",
      category: "action",
      title: "LoadAmmo",
      description: "填装弹药",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "NeedAmmo",
      category: "condition",
      title: "NeedAmmo",
      description:
        "判断 Ammunition 值是否空了\n无弹药返回 success\n有弹药返回 failure",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "UnitStatus",
      category: "condition",
      title: "UnitStatus",
      description: "状态编码\n1. c2s_carry 持枪状态\n2. c2s_aim  瞄准状态",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "CanAttack",
      category: "condition",
      title: "CanAttack",
      description: "满足攻击条件",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "SwitchWeapon",
      category: "action",
      title: "SwitchWeapon",
      description: "0:空手\n1:刀\n2:手枪\n3:步枪或狙击",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "HasWeapon",
      category: "condition",
      title: "HasWeapon",
      description:
        "HAND: 手\nKNIFE:刀\nPISTOL: 手枪\nRIFLE: 步枪\n逗号分割多种武器",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "IsMoving",
      category: "condition",
      title: "IsMoving",
      description: "是否在移动",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "Rotation",
      category: "action",
      title: "Rotation",
      description: "direct: 1右转 0 左转\nangle: 转角度",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "SearchEnemy",
      category: "action",
      title: "SearchEnemy",
      description: "搜寻敌人",
      properties: {}
    },
    {
      version: "0.3.0",
      scope: "node",
      name: "FoundEnemy",
      category: "condition",
      title: "FoundEnemy",
      description: "发现目标",
      properties: {}
    }
  ]
};

export default UnitFightAttack;
