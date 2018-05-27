import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(products: any[], args?: any): any[] {
        if (!products) {
            return [];
        }
        if (!args.field || !args.product) {
            return products;
        }
        if (args.field === 'name') {
            return products.filter(singleItem => singleItem[args.field].toLowerCase().includes(args.product.toLowerCase()));
        }
        if (args.field === 'available') {
            if (args.product === 'best_seller') {
                return products.filter(singleItem => singleItem['best_seller'] === true)
            }
            return products.filter(singleItem => singleItem[args.field] === ((args.product === true) ? args.product : false))
        }
        else {
            return products.filter(singleItem => singleItem[args.field].includes(args.product));
        }
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