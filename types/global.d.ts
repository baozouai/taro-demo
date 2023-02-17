/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace JSX {
    interface IntrinsicElements {
        'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    }
}

// declare module 'react' {
//   interface FunctionComponent<P = {}> {
//     (props: React.PropsWithChildren<P>, context?: any): React.ReactElement<any, any> | null;
//   }
// }
declare type FC<P = {}> = React.FC<React.PropsWithChildren<P>>;
