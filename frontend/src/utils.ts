class Utils {
  private static instance: Utils ;
  static get() {
    if(!Utils.instance) {
      Utils.instance = new Utils();
    }
    return Utils.instance;
  }

  public withinRange(range: [number, number], target: number) {
    return target > range[0] && target < range[1];
  }

}

const utils = Utils.get();

export { utils as Utils }