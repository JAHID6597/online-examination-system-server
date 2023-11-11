export class CommonUtils {
  public static getMapped<T>(list: T[], key: string): Map<string, T> {
    const mappedData = new Map<string, T>();

    for (const item of list) {
      const idKey = String(item[key]);
      mappedData.set(idKey, item);
    }

    return mappedData;
  }

  public static groupBy<T>(list: T[], key: string) {
    return list.reduce((result, currentValue) => {
      if (currentValue[key]) {
        const keyValue = currentValue[key].toString();
        (result[keyValue] = result[keyValue] || []).push(currentValue);
      }
      return result;
    }, {});
  }

  public static getSum<T>(list: T[], key: string): number {
    return list.reduce((prev, cur) => prev + cur[key], 0);
  }

  public static bothArraysAreEqual<T>(arr1: T[], arr2: T[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }
}
