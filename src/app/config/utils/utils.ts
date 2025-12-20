var _ = require('lodash')

// import * as XLSX from "xlsx";
export function arrayToNodesMap(data: any[]): any[] {
  return data.map(elt => {
    if (elt.root_code != "" && elt.sub == null)
      return {
        title: elt.cle || elt.libelle || elt.nom,
        value: elt.cle || elt.code,
        key: elt.cle || elt.code,
        isLeaf: true
      }
    else
      return {
        title: elt.cle || elt.libelle || elt.nom,
        value: elt.cle || elt.code,
        key: elt.cle || elt.code,
        children: elt.sub != null ? arrayToNodesMap(elt.sub) : []
      }
  })
}

export function groupByKey(array: any[], key: string): any {
  return array
    .reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)})
    }, {})
}

export function concatByKey(array: any[], key: string) {
  return array.map(elt => {
    return elt[key]
  })
}

export function selectOptionsListMap(data: any[]) {
  return data.map(elt => {
    return {label: elt.cle || elt.libelle || elt.nom, value: elt.cle || elt.code}
  })
}

/**
 * Fuction to export a Excel file
 * @param tableId
 * @param name
 */
// export function exportToExcel(tableId: string, name?: string) {
//   let timeSpan = new Date().toISOString();
//   let prefix = name || "ExportResult";
//   let fileName = `${prefix}-${timeSpan}`;
//   let targetTableElm = document.getElementById(tableId);
//   let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
//   XLSX.writeFile(wb, `${fileName}.xlsx`);
// }

/**
 * Function to import a Excel file
 * @param file File instance
 * @param cb Callback
 */
// export function importFromExcel(file: any, cb) {
//   let fileReader = new FileReader();
//   let output = [];

//   fileReader.onload = (e) => {
//     const arrayBuffer: any = e.target.result;
//     const data = new Uint8Array(arrayBuffer);
//     const arr = new Array();

//     for (let i = 0; i !== data.length; i++) {
//       arr[i] = String.fromCharCode(data[i]);
//     }

//     const bstr = arr.join('');
//     const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
//     const first_sheet_name = workbook.SheetNames[0];

//     const worksheet = workbook.Sheets[first_sheet_name];
//     let _worksheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//     //console.log(_worksheet);
//     output = _worksheet;
//     cb(output);
//   };
//   fileReader.readAsArrayBuffer(file);
// }

/**
 * Function to get element index from array
 * @param array
 * @param param1
 */
// export function getIndexBy(array: Array<{}>, {name, value}): number {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i][name] === value) {
//       return i;
//     }
//   }
//   return -1;
// }

/**
 * Function to get element index from array
 * @param array
 * @param param1
 */
// export function getIndexByKeyDeep(array: Array<{}>, {name, value}): number | number[] {
//   let indexArray: any[] = []
//   for (let i = 0; i < array.length; i++) {
//     if (array[i][name] === value) {
//       // indexArray.push(i);
//       return i
//     } else if (Array.isArray(array[i][name])) {
//       let found = getIndexByKeyDeep(array[i][name], {name, value})
//       if (found) {
//         indexArray.push(i);
//         indexArray.push(found)
//         return indexArray
//       }
//     }
//   }
//   return -1;
// }

interface INewValue {
  key: string,
  matchValue: any,
  unmatchValue?: any
}

export function updateItemInArrayByIndex(
  array: any[],
  itemIndex: number,
  newValue: INewValue,
  cond: string = '='): any[] {
  // let index = getIndexBy(this.menuItems, {name: 'routing', value: item.routing})
  return array.map((elt, i) => {
    let clone = {...elt}
    switch (cond) {
      case '=':
        if (itemIndex == i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) clone[newValue.key] = newValue.unmatchValue
        return clone

      case '!=':
        if (itemIndex != i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) _.set(clone, newValue.key, newValue.unmatchValue)
        return clone

      case '>':
        if (itemIndex >= i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) _.set(clone, newValue.key, newValue.unmatchValue)
        return clone

      case '>=':
        if (itemIndex >= i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) _.set(clone, newValue.key, newValue.unmatchValue)
        return clone

      case '<':
        if (itemIndex < i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) _.set(clone, newValue.key, newValue.unmatchValue)
        return clone

      case '<=':
        if (itemIndex <= i) _.set(clone, newValue.key, newValue.matchValue)
        else if (newValue.unmatchValue != undefined) _.set(clone, newValue.key, newValue.unmatchValue)
        return clone

    }
  })
}

export function updateItemInArrayByKey(
  array: any[],
  iterativeKey: string,
  key: string | number,
  keyValue: string | number,
  newValue: INewValue,
  cond: string = '='): any[] {
  return array.map((elt, i) => {
    let clone = {...elt}
    if (clone[iterativeKey] && clone[iterativeKey] != null) clone[iterativeKey] = updateItemInArrayByKey(clone[iterativeKey], iterativeKey, key, keyValue, newValue, cond)
    const val = elt[key]
    switch (cond) {
      case '=':
        if (keyValue == val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

      case '!=':
        if (keyValue != val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

      case '>':
        if (keyValue >= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

      case '>=':
        if (keyValue >= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

      case '<':
        if (keyValue < val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

      case '<=':
        if (keyValue <= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
        else if (newValue.unmatchValue != undefined) updateObject(clone, {
          key: newValue.key,
          value: newValue.unmatchValue
        })
        return clone

    }
  })
}

export function updateStrictItemInArrayByKey(
  array: any[],
  iterativeKey: string,
  key: string | number,
  keyValue: string | number,
  newValue: INewValue,
  cond: string = '='): any[] {
  return array.map((elt, i) => {
    let clone = {...elt}
    if (clone[key] != key && clone[iterativeKey] && clone[iterativeKey] != null) {
      clone[iterativeKey] = updateStrictItemInArrayByKey(clone[iterativeKey], iterativeKey, key, keyValue, newValue, cond)
      return clone
    } else {
      const val = elt[key]
      switch (cond) {
        case '=':
          if (keyValue == val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

        case '!=':
          if (keyValue != val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

        case '>':
          if (keyValue >= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

        case '>=':
          if (keyValue >= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

        case '<':
          if (keyValue < val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

        case '<=':
          if (keyValue <= val) updateObject(clone, {key: newValue.key, value: newValue.matchValue})
          else if (newValue.unmatchValue != undefined) updateObject(clone, {
            key: newValue.key,
            value: newValue.unmatchValue
          })
          return clone

      }
    }
  })
}

function updateObject(object: any, addedValue: { key: string, value: any }) {
  _.merge(object, setObjectByKey(addedValue.key, addedValue.value))
}

function setObjectByKey(key: string, val: any) {
  let keys = key.split('.')
  let temp: string = '{'
  let end = '}'
  keys.forEach((elt, i) => {
    if (i == keys.length - 1) temp += `"${elt}": ${JSON.stringify(val)} ${end}`
    else {
      temp += `"${elt}":{`;
      end += '}'
    }
  });
  return JSON.parse(temp)
}

// Convert to JSON using a replacer function to output
// the string version of a function with /Function(
// in front and )/ at the end.
export function jsonStringifyWithFunction(obj: any) {
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === "function") {
      return "/Function(" + value.toString() + ")/";
    }
    return value;
  });
}

// Convert to an object using a reviver function that
// recognizes the /Function(...)/ value and converts it
// into a function via -shudder- `eval`.
export function jsonParseWithFunction(json: any) {
  return JSON.parse(json, function (key, value) {
    if (typeof value === "string" &&
      value.startsWith("/Function(") &&
      value.endsWith(")/")) {
      value = value.substring(10, value.length - 2);
      return (0, eval)("(" + value + ")");
    }
    return value;
  });
}

export function jsonParseWithFunctionV2(json: any) {
  return JSON.parse(json, function (key, value) {
    if (value.function) {
      // args.push(value.arguments)
      return new Function(...value.arguments, value.body)
    }
    return value;
  });
}

export function buildMenuSub(array: Array<any>, code: string): any[] {
  let menu: Array<any> = []
  array.forEach(elt => {
    if (elt.parent_code == code) {
      let clone = {
        ...elt,
        sub: buildMenuSub(array.filter((e: any) => e.parent_code == elt.code), elt.code)
      }
      menu.push(clone)
    }
  })
  return _.sortBy(menu, 'order')
}

let parentsCases: Array<any> = []

export function buildMenuSubV3(parents: Array<any>, enfants: Array<any>): any[] {
  let menu: Array<any> = []
  let menuEnfants: Array<any> = enfants
  console.log(0)
  parents = parents.map(elt => {
    //Si le menu a déjà été traité on passe
    if (parentsCases.includes(elt.id)) return undefined;
    let filterEnfant = enfants.filter(m => m.parent_code == elt.code)
    menuEnfants = menuEnfants.filter(m => m.parent_code != elt.code && m.code != elt.code)
    let clone = {
      ...elt,
      sub: buildMenuSubV3(filterEnfant, menuEnfants) || []
    }
    parentsCases.push(elt.id)
    return clone
  })
  return _.sortBy(parents.filter(p => p != undefined), 'order')
}

export function searchMenuByAnyKey(array: Array<any>, key: string, value: string): any {
  let menu: any
  for (let elt of array) {
    if (elt[key]?.toUpperCase() == value.toUpperCase()) {
      menu = elt
      break
    } else {
      if (elt.sub && elt.sub.length) menu = searchMenuByAnyKey(elt.sub, key, value)
      if (menu) break
    }
  }
  console.log(menu)
  return menu
}

