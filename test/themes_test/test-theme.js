import { Theme, Colors, ColorManipulator } from '../../src/';

const customTheme = new Theme ();
// Change some default theme properties
customTheme.typo.font = 'Luckiest Guy, sans-serif';
customTheme.palette.subTextColor = ColorManipulator.fade(Colors.white, 0.54);
export default customTheme;
