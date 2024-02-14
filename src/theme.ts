// my-theme.ts
import { DefaultTheme } from 'styled-components';

const breakpoints = {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

const theme: DefaultTheme = {
  colors: {
    text: '#fff',
    text_hint: '#99C7F5',
    text_placeholder: '#6B97C2',
    textbox_text: '#99C7F5',
    button_text: '#fff',
    button_text_hover: '#99c7f5',
  },
  background: {
    background: '#1E4164',
    container: '#1A3550',
    button: '#365E87',
    button_border: '#1A3550',
    positive_feedback: 'seagreen',
    negative_feedback: 'indianred',
    mark_container: '#1E4164',
    mark_container_box: '#365E87',
    textbox: '#365E87',
    textbox_focus: '#225588',
    footer: '#365E87'
  },

  devices: {
    xs: `max-width: ${breakpoints.xs}`,
    sm: `max-width: ${breakpoints.sm}`,
    md: `max-width: ${breakpoints.md}`,
    lg: `max-width: ${breakpoints.lg}`,
    xl: `max-width: ${breakpoints.xl}`,
    "2xl": `max-width: ${breakpoints["2xl"]}`,
  }
};

export default theme;