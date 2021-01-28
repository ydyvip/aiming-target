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
            x: -36,
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
        "502d7c79-7221-4708-b581-8d40f65ea108": {
          id: "502d7c79-7221-4708-b581-8d40f65ea108",
          name: "OutOfRange",
          title: "OutOfRange",
          description: "判断是否超出射程\n超出返回 failure\n没超出返回 success",
          properties: {},
          display: {
            x: 336,
            y: 108
          }
        },
        "74047aee-d956-45f0-89e6-f8004adacfb3": {
          id: "74047aee-d956-45f0-89e6-f8004adacfb3",
          name: "LoadAmmo",
          title: "LoadAmmo",
          description: "填装弹药",
          properties: {},
          display: {
            x: 144,
            y: 108
          }
        },
        "a932ee14-bb4e-4efb-8d94-eda9ada49b2d": {
          id: "a932ee14-bb4e-4efb-8d94-eda9ada49b2d",
          name: "NpcMove",
          title: "NpcMove",
          description:
            "作战单位移动\n一般是攻击的对象在射程范围之外，需要移动一定的距离，去进行攻击",
          properties: {},
          display: {
            x: 528,
            y: 108
          }
        },
        "bf37b427-6248-4e7c-8c8a-5643d374a965": {
          id: "bf37b427-6248-4e7c-8c8a-5643d374a965",
          name: "FindEnemy",
          title: "FindEnemy",
          description:
            "确定要攻击的敌人\n1. 对位有敌人，优先攻击\n2. 对位没有敌人，选取当前对象左右两边敌人编号小的功能",
          properties: {},
          display: {
            x: 732,
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
            x: 1224,
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
            x: 432,
            y: -144
          },
          children: [
            "9bcadf3c-6e77-4b47-bfb6-6eec2836523a",
            "abcef166-df1c-45b7-8cc7-2a6a864bfc7a",
            "a3009045-0bff-4d8c-b0dc-be99c0cda448"
          ]
        },
        "0eb87920-be85-467d-8bcc-7a84fb298676": {
          id: "0eb87920-be85-467d-8bcc-7a84fb298676",
          name: "CanAttack",
          title: "CanAttack",
          description: "满足攻击条件",
          properties: {},
          display: {
            x: 912,
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
            x: 984,
            y: 0
          },
          children: [
            "bf37b427-6248-4e7c-8c8a-5643d374a965",
            "0eb87920-be85-467d-8bcc-7a84fb298676",
            "ed5f1ebe-f544-4549-896e-1b2c776cc544",
            "0a831682-6aac-40e5-846c-bc6765f548ae"
          ]
        },
        "e4cd5c88-8541-43c5-85fd-19e3544df0f9": {
          id: "e4cd5c88-8541-43c5-85fd-19e3544df0f9",
          name: "OutOfRange",
          title: "OutOfRange",
          description: "判断是否超出射程\n超出返回 failure\n没超出返回 success",
          properties: {},
          display: {
            x: 1068,
            y: 252
          }
        },
        "ed5f1ebe-f544-4549-896e-1b2c776cc544": {
          id: "ed5f1ebe-f544-4549-896e-1b2c776cc544",
          name: "Inverter",
          title: "Inverter",
          description: "",
          properties: {},
          display: {
            x: 1068,
            y: 108
          },
          child: "e4cd5c88-8541-43c5-85fd-19e3544df0f9"
        },
        "abcef166-df1c-45b7-8cc7-2a6a864bfc7a": {
          id: "abcef166-df1c-45b7-8cc7-2a6a864bfc7a",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: 432,
            y: 0
          },
          children: [
            "502d7c79-7221-4708-b581-8d40f65ea108",
            "a932ee14-bb4e-4efb-8d94-eda9ada49b2d"
          ]
        },
        "9bcadf3c-6e77-4b47-bfb6-6eec2836523a": {
          id: "9bcadf3c-6e77-4b47-bfb6-6eec2836523a",
          name: "Sequence",
          title: "Sequence",
          description: "",
          properties: {},
          display: {
            x: -36,
            y: 0
          },
          children: [
            "56ea8697-78ff-4809-bf7c-4b8d566e312e",
            "ea7a2c62-d250-4016-873b-e56e87a7053b",
            "74047aee-d956-45f0-89e6-f8004adacfb3"
          ]
        },
        "56ea8697-78ff-4809-bf7c-4b8d566e312e": {
          id: "56ea8697-78ff-4809-bf7c-4b8d566e312e",
          name: "HasWeapon",
          title: "HasWeapon",
          description: "有没有武器",
          properties: {},
          display: {
            x: -228,
            y: 108
          }
        }
      },
      display: {
        camera_x: 783.8250000457047,
        camera_y: 445.0800000260351,
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
      name: "FindEnemy",
      category: "action",
      title: "FindEnemy",
      description:
        "确定要攻击的敌人\n1. 对位有敌人，优先攻击\n2. 对位没有敌人，选取当前对象左右两边敌人编号小的功能",
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
      name: "HasWeapon",
      category: "condition",
      title: "HasWeapon",
      description: "有没有武器",
      properties: {}
    }
  ]
};

export default UnitFightAttack;
