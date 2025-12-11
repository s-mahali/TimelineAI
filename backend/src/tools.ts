import {tool} from "langchain"
import * as z from 'zod'

/*mock history timeline data 
//This will be object of an array// min 5-6 cards will be shown on UI
{ id: '6', year: 2011, title: 'The Burning Platform', description: 'CEO Stephen Elop issues the famous memo. Partners exclusively with Windows Phone.', type: 'historical', sentiment: 'negative', impactScore: 88, marketValue: '$40B', tags: ['Strategic Error', 'Windows'] },

mock future timeline data 
{ id: '8', year: 2020, title: 'Infrastructure Rebirth', description: 'Nokia focuses purely on 5G networks and patent licensing. Stable but smaller.', type: 'historical', sentiment: 'neutral', impactScore: 60, marketValue: '$25B', tags: ['Pivot', '5G'] },
      { id: '9', year: 2028, title: '6G Standardization', description: 'PREDICTION: Nokia leads the global standard for 6G, reclaiming relevance in B2B.', type: 'prediction', sentiment: 'positive', impactScore: 75, marketValue: '$45B',

*/

