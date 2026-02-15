// aframe.d.ts
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // A-Frame Scene & Core
      'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        embedded?: boolean | string;
        'vr-mode-ui'?: string;
        'loading-screen'?: string;
        renderer?: string;
        [key: string]: any;
      };

      // A-Frame Assets
      'a-assets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        timeout?: number | string;
        [key: string]: any;
      };

      // A-Frame Camera
      'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        active?: boolean | string;
        position?: string;
        rotation?: string;
        'look-controls'?: string | boolean;
        'wasd-controls'?: string | boolean;
        [key: string]: any;
      };

      // A-Frame Cursor
      'a-cursor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        opacity?: number | string;
        fuse?: boolean | string;
        'fuse-timeout'?: number | string;
        [key: string]: any;
      };

      // A-Frame Videosphere (360° Video)
      'a-videosphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        rotation?: string;
        radius?: number | string;
        'segments-width'?: number | string;
        'segments-height'?: number | string;
        [key: string]: any;
      };

      // A-Frame Sky
      'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        src?: string;
        radius?: number | string;
        [key: string]: any;
      };

      // A-Frame Entity (Generic)
      'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: string;
        rotation?: string;
        scale?: string;
        visible?: boolean | string;
        [key: string]: any;
      };

      // A-Frame Box
      'a-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        position?: string;
        rotation?: string;
        width?: number | string;
        height?: number | string;
        depth?: number | string;
        [key: string]: any;
      };

      // A-Frame Sphere
      'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        position?: string;
        radius?: number | string;
        [key: string]: any;
      };

      // A-Frame Plane
      'a-plane': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        position?: string;
        rotation?: string;
        width?: number | string;
        height?: number | string;
        [key: string]: any;
      };

      // A-Frame Text
      'a-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        value?: string;
        color?: string;
        position?: string;
        align?: string;
        width?: number | string;
        [key: string]: any;
      };

      // A-Frame Light
      'a-light': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        type?: string;
        color?: string;
        intensity?: number | string;
        position?: string;
        [key: string]: any;
      };

      // A-Frame Image
      'a-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        position?: string;
        width?: number | string;
        height?: number | string;
        [key: string]: any;
      };

      // A-Frame Video
      'a-video': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        position?: string;
        width?: number | string;
        height?: number | string;
        [key: string]: any;
      };

      // A-Frame Sound
      'a-sound': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        autoplay?: boolean | string;
        loop?: boolean | string;
        volume?: number | string;
        [key: string]: any;
      };
    }
  }
}

// PENTING: Export kosong agar file ini dianggap sebagai module
export {};