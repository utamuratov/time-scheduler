import { Pipe, type PipeTransform } from '@angular/core';
import { Id } from '../../models/id.interface';
import { Option } from '../models/option.model';

// ! NOT USED YET. WE HAVE ALTERNATIVE FUNCTION nameByIdGetter
@Pipe({
  name: 'appNameById',
  standalone: true,
})
export class NameByIdPipe implements PipeTransform {
  transform(id: number, data: Option[]): string {
    const item = data.find((w) => w.value === id);
    if (item) {
      return item.label;
    }
    return id.toString();
  }
}
