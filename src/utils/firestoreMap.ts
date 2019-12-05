// @ts-ignore
import { mapValues, isString, isNumber, isArray, isNull, isBoolean, isObject, isDate } from 'lodash'

export default function firestoreMap(data: any) {
  return mapValues(data, (v: any) => {
    if (isString(v))
      return { "stringValue": v }

    if (isNumber(v)) {
      if (Number.isInteger(v)) {
        return { "integerValue": v }
      } else {
        return { "doubleValue": v }
      }
    }

    if (isNull(v))
      return { "nullValue": v }

    if (isDate(v))
      return { "timestampValue": v }

    if (isBoolean(v))
      return { "booleanValue": v }

    if (isObject(v))
      return { "mapValue": { "fields": firestoreMap(v) } }

    if (isArray(v))
      return { "arrayValue": { "values": firestoreMap(v) } }

    return { "stringValue": "UNABLE TO MAP VALUE" }
  });
}
  