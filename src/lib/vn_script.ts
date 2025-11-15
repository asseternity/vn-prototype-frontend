// types
import { VNScript, Character } from './vn_objects';
import type { VNLine } from './vn_objects';

// assets
import portrait_test_1 from '/portrait_test_1.png';
import portrait_test_2 from '/portrait_test_2.png';
import portrait_test_3 from '/portrait_test_3.png';

// test script
const Mary = new Character('0', 'Mary', portrait_test_1);
const Andy = new Character('1', 'Andy', portrait_test_2);
const James = new Character('2', 'James', portrait_test_3);
const line0: VNLine = {
  speaker: null,
  text: 'The beach stretches out endlessly, warm sand shimmering under the late afternoon sun.',
};
const line1: VNLine = {
  speaker: Mary,
  text: 'Finally. I swear this sand is hotter than my patience today.',
};
const line2: VNLine = {
  speaker: Andy,
  text: 'Maybe don’t wear black boots to the beach next time?',
};
const line3: VNLine = {
  speaker: Mary,
  text: 'Fashion is suffering. This is known.',
};
const line4: VNLine = {
  speaker: James,
  text: 'Yeah well, your suffering is making crunchy footstep noises.',
};
const line5: VNLine = {
  speaker: null,
  text: 'A soft breeze rolls across the shore, carrying the distant calls of gulls.',
};
const line6: VNLine = {
  speaker: Andy,
  text: 'Okay but seriously, this place hits different today.',
};
const line7: VNLine = {
  speaker: Mary,
  text: 'Probably because someone actually agreed to come with me for once.',
};
const line8: VNLine = {
  speaker: James,
  text: 'You bribed us with promises of snacks.',
};
const line9: VNLine = { speaker: Mary, text: 'Allegedly.' };
const line10: VNLine = {
  speaker: null,
  text: 'Waves crash rhythmically, foaming white across the shore.',
};
const line11: VNLine = {
  speaker: Andy,
  text: 'Yo, the water looks incredible.',
};
const line12: VNLine = { speaker: James, text: 'You gonna go in?' };
const line13: VNLine = {
  speaker: Andy,
  text: 'Yeah, after I stop imagining jellyfish plotting my downfall.',
};
const line14: VNLine = { speaker: Mary, text: 'You’ll be fine. Probably.' };
const line15: VNLine = {
  speaker: null,
  text: 'Mary kneels down, scooping up a handful of damp sand.',
};
const line16: VNLine = {
  speaker: Mary,
  text: 'This sand is perfect. Peak sculpting material.',
};
const line17: VNLine = {
  speaker: James,
  text: 'We’re building something? I did not sign up for manual labor.',
};
const line18: VNLine = {
  speaker: Mary,
  text: 'We’re building the biggest, most dysfunctional sandcastle known to humanity.',
};
const line19: VNLine = { speaker: Andy, text: 'Say less. I’m in.' };
const line20: VNLine = {
  speaker: null,
  text: 'They begin piling sand, forming lopsided towers.',
};
const line21: VNLine = {
  speaker: James,
  text: 'Mine keeps collapsing. This sand has a personal vendetta.',
};
const line22: VNLine = {
  speaker: Mary,
  text: 'Try adding water. And also stop poking it.',
};
const line23: VNLine = {
  speaker: Andy,
  text: 'Look at my tower. It’s at least 20 percent less cursed than James’s.',
};
const line24: VNLine = {
  speaker: James,
  text: 'That’s slander. Mine has personality.',
};
const line25: VNLine = {
  speaker: null,
  text: 'A seagull lands nearby, staring at them with unearned confidence.',
};
const line26: VNLine = {
  speaker: Mary,
  text: 'Do not feed it. It will call its cousins.',
};
const line27: VNLine = {
  speaker: Andy,
  text: 'Too late. It already looks like it’s planning a heist.',
};
const line28: VNLine = {
  speaker: James,
  text: 'If it steals my granola bar, it deserves it more than I do.',
};
const line29: VNLine = { speaker: Mary, text: 'Wait. You brought snacks?' };
const line30: VNLine = {
  speaker: James,
  text: 'I didn’t trust you to provide any.',
};
const line31: VNLine = { speaker: null, text: 'The seagull inches closer.' };
const line32: VNLine = {
  speaker: Andy,
  text: 'Bro. It’s approaching with intent.',
};
const line33: VNLine = {
  speaker: Mary,
  text: 'Guard the snacks like your lives depend on it.',
};
const line34: VNLine = {
  speaker: James,
  text: 'This is ridiculous. I’m negotiating.',
};
const line35: VNLine = {
  speaker: null,
  text: 'James breaks a tiny piece of granola bar and tosses it away from them.',
};
const line36: VNLine = { speaker: James, text: 'Here, foul beast. Begone.' };
const line37: VNLine = {
  speaker: null,
  text: 'The seagull takes the bait and wobbles off triumphantly.',
};
const line38: VNLine = { speaker: Andy, text: 'Crisis averted.' };
const line39: VNLine = { speaker: Mary, text: 'For now.' };
const line40: VNLine = {
  speaker: null,
  text: 'The sun dips lower, warming the horizon with a gradient of gold and rose.',
};
const line41: VNLine = {
  speaker: Mary,
  text: 'Okay, real talk. This is gorgeous.',
};
const line42: VNLine = {
  speaker: Andy,
  text: 'It’s kinda surreal. Peaceful in a way that feels fake.',
};
const line43: VNLine = {
  speaker: James,
  text: 'If nature is catfishing us, it’s doing a good job.',
};
const line44: VNLine = {
  speaker: Mary,
  text: 'Let’s walk along the water before it gets dark.',
};
const line45: VNLine = {
  speaker: null,
  text: 'They leave their half-finished sandcastle to the mercy of the incoming tide.',
};
const line46: VNLine = {
  speaker: Andy,
  text: 'That thing is gonna get obliterated in five minutes.',
};
const line47: VNLine = {
  speaker: James,
  text: 'It lived a full life. Fifty minutes of chaos.',
};
const line48: VNLine = { speaker: Mary, text: 'Legends die young.' };
const line49: VNLine = {
  speaker: null,
  text: 'Waves lap around their ankles as they walk.',
};
const line50: VNLine = { speaker: Andy, text: 'Cold! Why is it always cold?' };
const line51: VNLine = {
  speaker: James,
  text: 'It’s the ocean, dude. It has one setting.',
};
const line52: VNLine = {
  speaker: Mary,
  text: 'Just keep moving. You get used to it.',
};
const line53: VNLine = {
  speaker: null,
  text: 'They continue down the beach, their shadows stretching long behind them.',
};
const line54: VNLine = {
  speaker: Andy,
  text: 'Do you ever wonder how many people walked this exact spot before us?',
};
const line55: VNLine = {
  speaker: James,
  text: 'Bro please do not start a philosophical arc right now.',
};
const line56: VNLine = { speaker: Mary, text: 'Let him cook.' };
const line57: VNLine = {
  speaker: Andy,
  text: 'I’m just saying… beaches feel timeless.',
};
const line58: VNLine = {
  speaker: James,
  text: 'Yeah well, my stomach feels empty. Timelessly empty.',
};
const line59: VNLine = { speaker: Mary, text: 'Fine. We’ll eat soon.' };
const line60: VNLine = {
  speaker: null,
  text: 'The sky shifts into deeper shades as the first stars peek through.',
};
const line61: VNLine = { speaker: Andy, text: 'Whoa. Stars already?' };
const line62: VNLine = {
  speaker: James,
  text: 'Guess time flies when you’re battling seagulls.',
};
const line63: VNLine = {
  speaker: Mary,
  text: 'Let’s head back. The darkness here hits fast.',
};
const line64: VNLine = {
  speaker: null,
  text: 'They turn around, the night breeze brushing cool against their skin.',
};
const line65: VNLine = {
  speaker: James,
  text: 'Next time we bring a blanket and actual food.',
};
const line66: VNLine = { speaker: Mary, text: 'Noted. Maybe.' };
const line67: VNLine = {
  speaker: Andy,
  text: 'Nah she’s lying. Bring your own snacks unless you wanna starve.',
};
const line68: VNLine = {
  speaker: Mary,
  text: 'Listen. I provide vibes. You provide calories.',
};
const line69: VNLine = {
  speaker: null,
  text: 'They laugh together as they make their way off the dimming shoreline.',
};
const line70: VNLine = { speaker: James, text: 'Beach day successful.' };
const line71: VNLine = { speaker: Andy, text: 'Chaotic, but successful.' };
const line72: VNLine = { speaker: Mary, text: 'Obviously. I planned it.' };
const line73: VNLine = {
  speaker: null,
  text: 'The final glow of sunset fades, leaving only the soft rush of waves behind them.',
};

export const script = new VNScript([
  line0,
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
  line9,
  line10,
  line11,
  line12,
  line13,
  line14,
  line15,
  line16,
  line17,
  line18,
  line19,
  line20,
  line21,
  line22,
  line23,
  line24,
  line25,
  line26,
  line27,
  line28,
  line29,
  line30,
  line31,
  line32,
  line33,
  line34,
  line35,
  line36,
  line37,
  line38,
  line39,
  line40,
  line41,
  line42,
  line43,
  line44,
  line45,
  line46,
  line47,
  line48,
  line49,
  line50,
  line51,
  line52,
  line53,
  line54,
  line55,
  line56,
  line57,
  line58,
  line59,
  line60,
  line61,
  line62,
  line63,
  line64,
  line65,
  line66,
  line67,
  line68,
  line69,
  line70,
  line71,
  line72,
  line73,
]);
