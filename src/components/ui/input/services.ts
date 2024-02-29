import type { InputProps } from './types';

export function computedWidth(width: InputProps['width']): string {
    try {
        const reSymb = /\D+/;
        if (typeof width === 'number' || !isNaN(Number(width))) {
            return width + 'px';
        }
        if (typeof width === 'string' && isNaN(Number(width))) {
            const symbMatches = reSymb.exec(width) || [];
            const symbMatch = symbMatches[0];
            if (symbMatch === 'px' || symbMatch === '%') {
                return width;
            }
        }
        return '';
    } catch (err) {
        return '';
    }
}
