export const assumptionData = {
  assumpId: String(new Date().getTime()),
  // assumpId: "5ff41e563ca91b13e55721cc",
  isPushSituation: true, // 是否推送
  initData: {
    mapType: "single_soldier",
    timeSpeed: 1,
    frame: 10,
    tickTime: 50,
    playback: false, // 是否回放
    situationTime: 250, // 态势推送时间 isPushSItuation必须为true

    reds: [],
    blues: []
  }
};
