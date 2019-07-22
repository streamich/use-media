import {MediaQueryObject} from '../types';
import camelToHyphen from './camel-to-hypen';

const QUERY_COMBINATOR = ' and ';

export default function queryObjectToString(query: string | MediaQueryObject) {
  if (typeof query === 'string') {
    return query;
  }

  return Object.entries(query)
    .map(([feature, value]) => {
      const convertedFeature = camelToHyphen(feature);
      let convertedValue = value;

      if (typeof convertedValue === 'boolean') {
        return convertedValue ? convertedFeature : `not ${convertedFeature}`;
      }

      if (
        typeof convertedValue === 'number' &&
        /[height|width]$/.test(convertedFeature)
      ) {
        convertedValue = `${convertedValue}px`;
      }

      return `(${convertedFeature}: ${convertedValue})`;
    })
    .join(QUERY_COMBINATOR);
}
