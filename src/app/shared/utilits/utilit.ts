import { Option } from '../models/option.model';
import { ValueGetterParams } from 'ag-grid-community';

export function nameByIdGetter(key: string, data: Option[]) {
  return (params: ValueGetterParams) => {
    const item = data.find((w) => w.value === params.data[key]);
    if (item) {
      return item.label;
    }
    return params.data[key].toString();
  };
}
