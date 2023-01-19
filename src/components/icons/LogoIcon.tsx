import React from 'react';

export const LogoIcon: React.FC<React.ComponentPropsWithoutRef<'svg'>> = (
  props,
) => {
  return (
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          className="logo_bg"
          d="M56.000016 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8"
          fill="#E44332"
        ></path>
        <g className="logo_stripe" fill="#FFF">
          <path
            d="M13.672368 29.985936c1.1304-.65152 25.34368-14.58496 25.89952-14.90592.5544-.32016.58224-1.30224-.03824-1.65632-.62096-.35408-1.79984-1.02368-2.23856-1.28048-.44656-.26048-1.24976-.40528-1.99472.02384-.30928.1784-21.00256 12.0768-21.69424
                        12.46992-.82784.47072-1.85248.4768-2.67744-.0008-.65152-.37696-10.92864-6.3488-10.92864-6.3488v5.39712c2.66016 1.54912 9.2744 5.40128 10.87744 6.30624.95664.54016 1.87232.52688 2.79488-.0048"
          ></path>
          <path
            d="M13.672368 40.76952c1.1304-.65152 25.34368-14.58496 25.89952-14.90592.5544-.32.58224-1.30224-.03824-1.65632-.62096-.35408-1.79984-1.02368-2.23856-1.28048-.44656-.26048-1.24976-.40528-1.99472.02384-.30928.1784-21.00256 12.0768-21.69424
                        12.46992-.82784.47072-1.85248.4768-2.67744-.0008-.65152-.37696-10.92864-6.3488-10.92864-6.3488v5.39712c2.66016 1.54912 9.2744 5.40128 10.87744 6.30624.95664.54016 1.87232.52688 2.79488-.0048"
          ></path>
          <path
            d="M13.672368 51.55312c1.1304-.65152 25.34368-14.58496 25.89952-14.90592.5544-.32.58224-1.30224-.03824-1.65632-.62096-.35408-1.79984-1.02368-2.23856-1.28048-.44656-.26048-1.24976-.40528-1.99472.02384-.30928.1784-21.00256 12.0768-21.69424
                        12.46992-.82784.47072-1.85248.4768-2.67744-.0008-.65152-.37696-10.92864-6.3488-10.92864-6.3488v5.39712c2.66016 1.54912 9.2744 5.40128 10.87744 6.30624.95664.54016 1.87232.52688 2.79488-.0048"
          ></path>
        </g>
      </g>
    </svg>
  );
};
