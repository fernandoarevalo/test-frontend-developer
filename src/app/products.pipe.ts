import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(products: any[], product): any {
        return product
            ? products.filter(item => item.name.indexOf(product.toLowerCase()) !== -1)
            : products;
    }
}

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(products: any[], args?: any): any {
        return products
            ? products.sort(function (a, b) {
                if (a[args.property] < b[args.property]) {
                    return -1 * args.direction;
                }
                else if (a[args.property] > b[args.property]) {
                    return 1 * args.direction;
                }
                else {
                    return 0;
                }
            })
            : products;
    };
}