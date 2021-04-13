// -- scripted by @ardodeardo - gojek webteam FE dev
// check what type of device is being used

const screenWidth = window.innerWidth;
const breakpoint = {
    "sm": 767.98,           // mobile
    "md": [768, 1023.98],   // small tablet
    "lg": [1024, 1199.98],  // large tablet
    "xl": 1200,             // desktop
    "xxl": 1600,            // large desktop
};

const isDevice = {
    sm: () => (screenWidth <= breakpoint.sm) ? true : false,
    md: () => (screenWidth >= breakpoint.md[0] && screenWidth <= breakpoint.md[1]) ? true : false,
    lg: () => (screenWidth >= breakpoint.lg[0] && screenWidth <= breakpoint.lg[1]) ? true : false,
    xl: () => (screenWidth >= breakpoint.xl) ? true : false,
    xxl: () => (screenWidth >= breakpoint.xxl) ? true : false,
};

export default isDevice;