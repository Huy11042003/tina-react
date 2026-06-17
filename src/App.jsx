import { useState, useEffect } from "react";
import leftSideImg from "./assets/left_side.png";
import rightSideImg from "./assets/right_side.png";
import homeHeroBg from "./assets/background.png";


const PINK="#f4a7c3",LPINK="#fce7f3",DARK="#7d2a4a",ACCENT="#c45c82",GOLD="#e8a0bc",TEXT="#3d1a2a",MUTED="#a06080",BORDER="#f0b8d0";
const PINK_KNOWLEDGE_TAGS=["Culture","History","Concepts"];
const PINK_EXAMPLE_AREAS=["Education","Law & Politics"];
const EQUALITY_LEFT_IMAGE=leftSideImg;
const EQUALITY_RIGHT_IMAGE=rightSideImg;

const HEROINES_STYLES=`
  .heroines-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
  }

  .heroine-card {
    min-width: 0;
  }

  .heroine-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .heroine-photo {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #f0b8d0;
    background: #fce7f3;
  }

  @media (max-width: 640px) {
    .heroines-grid {
      grid-template-columns: 1fr;
    }

    .heroine-identity {
      align-items: flex-start;
    }

    .heroine-photo {
      width: 72px;
      height: 72px;
    }
  }
`;

const KNOW=[
  {title:"What is gender inequality?",tag:"Definition",content:"Gender inequality refers to unequal treatment based on gender. It manifests in pay gaps, limited education access, restricted political participation, and cultural norms that limit women's autonomy."},
  {title:"Gender across cultures",tag:"Culture",content:"From dowry practices in South Asia to wage gaps in Western corporations, gender inequality takes different forms worldwide. Cultural norms, religion, law, and economics all intersect."},
  {title:"Gender in media",tag:"Media",content:"Women in media are often portrayed in stereotypical roles. The Bechdel Test reveals how few films pass basic representation standards. Advertising perpetuates beauty standards and limiting archetypes."},
  {title:"Historical context",tag:"History",content:"Women were denied the right to vote, own property, or sign contracts for most of recorded history. Yet pay gaps, maternal mortality, and domestic violence remain global crises today."},
  {title:"Global statistics 2025",tag:"Data",content:"Investing in women could add $4 trillion to the global economy by 2030 and $342 trillion by 2050. Yet 10% of women still live in extreme poverty — unchanged since 2020. Women hold just 27.5% of parliamentary seats."},
  {title:"Feminism vs. Misandry",tag:"Concepts",
   content:"Feminism is the belief in political, social, and economic equality of all genders — not superiority of women over men. Misandry, the dislike or contempt for men, is not feminism. Mainstream feminist theory explicitly rejects all gender-based hatred.",
   extra:{
     cols:[
       {label:"Feminism is",color:"#15803d",bg:"#dcfce7",points:["The belief in equality of all genders","A movement for the right to vote, work, and be heard","Inclusive of all genders who believe in equality","Rooted in research, law, and human rights"]},
       {label:"Misandry is",color:"#b45309",bg:"#fef3c7",points:["A dislike or contempt specifically for men","NOT the same as feminism","Rejected by mainstream feminist theory","Sometimes used to discredit the feminist movement"]},
     ],
     myth:"Feminists hate men. In reality, mainstream feminism seeks equality for all genders, not superiority of women."
   }
  },
];


const EXAMPS=[
  {area:"Workplace",icon:"💼",items:["Gender pay gap: women paid less for equal work","Being passed over for promotion (glass ceiling)","Pregnancy discrimination","Harassment and hostile work environments"]},
  {area:"Education",icon:"🎓",items:["Girls denied schooling in conflict regions","STEM fields discouraging female students","Girls pressured into feminine subjects","Child marriage cutting education short"]},
  {area:"Media & Culture",icon:"📺",items:["Women's appearance critiqued, men's ideas praised","Female characters as secondary or decorative","Beauty standards causing psychological harm","Underrepresentation in leadership on screen"]},
  {area:"Law & Politics",icon:"⚖️",items:["Women denied the vote until 20th century in many nations","Laws requiring male guardianship still exist","Reproductive rights restrictions","Underrepresentation in elected positions"]},
  {area:"Daily Life",icon:"🏠",items:["Expectations to handle all domestic labor","Not being taken seriously in medical settings","Street harassment and public unsafety","Being talked over or ignored in meetings"]},
];


const CDATA=[
  {title:"Economic Impact",color:"#c45c82",desc:"Investing in women could add $4 trillion to the global economy by 2030 and $342 trillion by 2050. Yet 10% of women still live in extreme poverty.",donuts:[{label:"Women in poverty",pct:10},{label:"Global gender gap closed",pct:69}],bars:[{label:"Women in extreme poverty",val:10,max:100,unit:"%"},{label:"Global gender gap closed to date",val:68.8,max:100,unit:"%"}]},
  {title:"Physical Health",color:"#9d174d",desc:"Women spend nearly 3 more years in poor health than men. By 2030, 1 in 3 women of reproductive age could have anaemia.",donuts:[{label:"Women food insecure",pct:26},{label:"Men food insecure",pct:24}],bars:[{label:"Women facing food insecurity",val:26.1,max:100,unit:"%"},{label:"Men facing food insecurity",val:24.2,max:100,unit:"%"}]},
  {title:"Political Exclusion",color:"#7c3aed",desc:"Women hold just 27.5% of parliamentary seats globally (2026). Only 22.4% of Cabinet ministers are women.",donuts:[{label:"In parliament",pct:28},{label:"In Cabinet",pct:22}],bars:[{label:"Women in parliament",val:27.5,max:100,unit:"%"},{label:"Women in Cabinet",val:22.4,max:100,unit:"%"}]},
  {title:"Violence & Mental Health",color:"#be185d",desc:"1 in 8 women aged 15–49 suffered partner violence in the last year. 76% of women MPs reported experiencing violence.",donuts:[{label:"Women MPs harassed",pct:76},{label:"Men MPs harassed",pct:68}],bars:[{label:"Women facing partner violence",val:12.5,max:100,unit:"%"},{label:"Women MPs harassed",val:76,max:100,unit:"%"}]},
  {title:"Generational Cycles",color:"#0f766e",desc:"Nearly 1 in 5 young women were married before age 18. Each year, 4 million girls undergo FGM.",donuts:[{label:"Married before 18",pct:20},{label:"FGM progress made",pct:15}],bars:[{label:"Young women married before 18",val:20,max:100,unit:"%"}]},
  {title:"Education Gaps",color:"#1e40af",desc:"Girls now surpass boys in school completion — yet in 65 of 70 countries, women rarely become principals.",donuts:[{label:"Senior managers",pct:30},{label:"Rarely principals",pct:93}],bars:[{label:"Senior managers who are women",val:29.5,max:100,unit:"%"}]},
  {title:"Unpaid Labor Burden",color:"#b45309",desc:"708 million women are excluded from the labour market by unpaid care work. Career breaks average 19.6 months vs 13.9 for men.",donuts:[{label:"Women's break",pct:65},{label:"Men's break",pct:46}],bars:[{label:"Women's avg career break (months)",val:19.6,max:30,unit:" mo"},{label:"Men's avg career break (months)",val:13.9,max:30,unit:" mo"}]},
  {title:"Leadership & AI Divide",color:"#15803d",desc:"Women hold 31% of global leadership roles and 14% of tech leadership. 28% of women's jobs are at AI risk vs 21% of men's.",donuts:[{label:"In leadership",pct:31},{label:"In tech leadership",pct:14}],bars:[{label:"Women in global leadership",val:31,max:100,unit:"%"},{label:"Women's jobs at AI risk",val:28,max:100,unit:"%"}]},
  {title:"Global Development",color:"#6d28d9",desc:"It will take 123 years to close the global gender gap (WEF 2025). Only 57% of gender tracking data exists.",donuts:[{label:"Gap closed",pct:69},{label:"Data available",pct:57}],bars:[{label:"Gender gap closed to date",val:68.8,max:100,unit:"%"},{label:"Gender data available",val:57,max:100,unit:"%"}]},
];


const HEROES=[
  {name:"Malala Yousafzai",years:"1997–present",country:"Pakistan / Global",action:"Survived an assassination attempt for advocating girls' education. Founded the Malala Fund.",wiki:"https://en.wikipedia.org/wiki/Malala_Yousafzai",image:"https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/field/image/2023/01/un7952210_20220919_lf_1683_.jpg"},
  {name:"Simone de Beauvoir",years:"1908–1986",country:"France",action:"Authored The Second Sex (1949), foundational to modern feminist theory.",wiki:"https://en.wikipedia.org/wiki/Simone_de_Beauvoir",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6e0F6tbWF1_n8xrIXcWYCyjpH-E8wEAvGg&s"},
  {name:"Harriet Tubman",years:"1820–1913",country:"USA",action:"Escaped slavery and led 70 people to freedom. Later a suffragist and rights fighter.",wiki:"https://en.wikipedia.org/wiki/Harriet_Tubman",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMmYcE-Pxr2yxEYEbmDzKPRy2O28tuEB370Q&s"},
  {name:"Wangari Maathai",years:"1940–2011",country:"Kenya",action:"Founded the Green Belt Movement. Nobel Peace Prize 2004.",wiki:"https://en.wikipedia.org/wiki/Wangari_Maathai",image:"https://phunuvietnam.mediacdn.vn/179072216278405120/2024/5/9/6-17152383752431689632995.jpg"},
  {name:"Tarana Burke",years:"1973–present",country:"USA",action:"Founded the MeToo movement in 2006, sparking a global reckoning.",wiki:"https://en.wikipedia.org/wiki/Tarana_Burke",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YapoyqHoKmMLv-bUDm0iWW--BZ-xDOsf7w&s"},
  {name:"Christine Lagarde",years:"1956–present",country:"France / Global",action:"First woman to head the IMF and the European Central Bank.",wiki:"https://en.wikipedia.org/wiki/Christine_Lagarde",image:"https://cdn2.tuoitre.vn/thumb_w/480/2019/9/28/christine-lagarde-15696392440751345409122.jpg"},
  {name:"Ruth Bader Ginsburg",years:"1933–2020",country:"USA",action:"US Supreme Court Justice; global feminist icon.",wiki:"https://en.wikipedia.org/wiki/Ruth_Bader_Ginsburg",image:"https://static.time.com/v3/assets/bltea6093859af6183b/blt3d94b6768bb8eadb/698a126522fb85fafce2b6f8/nikki-kahn-ruth-bader-ginsburg-2.jpg?branch=production&width=3840&quality=75&auto=webp&crop=3:2"},
  {name:"Amelia Earhart",years:"1897–1937",country:"USA",action:"First woman to fly solo across the Atlantic Ocean.",wiki:"https://en.wikipedia.org/wiki/Amelia_Earhart",image:"https://upload.wikimedia.org/wikipedia/commons/b/b2/Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg"},
];


const PROJECTS=[
  {title:"Global Fund for Women",country:"Global — est. 1987",icon:"💜",desc:"Leading feminist foundation. Flexible, multi-year grants to grassroots gender justice movements.",link:"https://www.globalfundforwomen.org",fund:true},
  {title:"Women's Global Empowerment Fund",country:"Denver, CO — Global",icon:"🌱",desc:"Supports women through microfinance, leadership training, and the Healthy Periods Initiative.",link:"https://wgefund.org",fund:true},
  {title:"Global Fund for Children — Gender Justice",country:"Washington D.C.",icon:"🧒",desc:"Funds community orgs advancing girls' education and supporting LGBTQ+ youth rights.",link:"https://globalfundforchildren.org/focus-area/gender-justice/",fund:true},
  {title:"Gender Equality Funds",country:"A project of As You Sow",icon:"📈",desc:"Helps investors score mutual funds and ETFs on gender equality metrics.",link:"https://genderequalityfunds.org",fund:true},
  {title:"UN Women — Fund for Gender Equality",country:"Global — est. 2009",icon:"🏛️",desc:"UN Women's flagship grant fund. $65M in grants to 121 projects in 80 countries since 2009.",link:"https://www.unwomen.org/en/trust-funds/fund-for-gender-equality",fund:true},
  {title:"Global Equality Fund ⚠️",country:"US State Dept. — archived 2025",icon:"📋",desc:"Axed by the Trump administration in 2025. Preserved here for reference.",link:"https://2021-2025.state.gov/global-equality-fund/",fund:true},
  {title:"Women's Weaving Co-operative",country:"Guatemala",icon:"🧵",desc:"Worker-owned association empowering women through fair wages and back-strap loom weaving.",link:"https://www.workaway.info/en/host/000000000090",fund:false},
  {title:"Mobile Support Unit for Female Refugees",country:"Greece",icon:"🏥",desc:"Mobile contact point in Attica offering medical consultations for refugee women and children.",link:"https://www.workaway.info/en/host/181365979238",fund:false},
  {title:"Women Empowerment & Sustainable Development",country:"India",icon:"🌿",desc:"Female-friendly sustainable community in Delhi supporting women through skill-building.",link:"https://www.workaway.info/en/host/892712333334",fund:false},
  {title:"Shelter for Survivors of Domestic Violence",country:"Kenya",icon:"🏠",desc:"The country's first shelter of its kind for women survivors of domestic violence.",link:"https://www.workaway.info/en/host/584137253374",fund:false},
  {title:"Charity to Empower Women and Children",country:"Thailand",icon:"🤝",desc:"Non-profit in Chiang Khong dedicated to ending abuse through community-driven initiatives.",link:"https://www.workaway.info/en/host/864261921423",fund:false},
];


const TIMELINE=[
  {year:"1848",title:"Seneca Falls Convention",wave:"First Wave",color:"#be185d",detail:"300 attendees signed the Declaration of Sentiments, demanding equal rights including the right to vote."},
  {year:"1893",title:"New Zealand — first suffrage",wave:"First Wave",color:"#be185d",detail:"New Zealand became the first self-governing country to grant women the right to vote."},
  {year:"1920",title:"19th Amendment, USA",wave:"First Wave",color:"#be185d",detail:"American women won the constitutional right to vote after 72 years of struggle."},
  {year:"1949",title:"The Second Sex published",wave:"Second Wave",color:"#7c3aed",detail:"Simone de Beauvoir argued women are made, not born, inferior."},
  {year:"1975",title:"Iceland Women's Strike",wave:"Second Wave",color:"#7c3aed",detail:"90% of Icelandic women refused to work for one day. The country ground to a halt."},
  {year:"1979",title:"CEDAW adopted",wave:"Second Wave",color:"#7c3aed",detail:"The UN adopted the international bill of rights for women."},
  {year:"1991",title:"Third Wave begins",wave:"Third Wave",color:"#0f766e",detail:"Rebecca Walker coined the term, emphasizing intersectionality."},
  {year:"2006",title:"MeToo founded",wave:"Third Wave",color:"#0f766e",detail:"Tarana Burke founded MeToo; it went viral globally in 2017."},
  {year:"2017",title:"Women's March",wave:"Fourth Wave",color:"#1e40af",detail:"The largest single-day protest in US history."},
  {year:"2025",title:"Gender Snapshot 2025",wave:"Fourth Wave",color:"#1e40af",detail:"UN Women data showed 123 years to close the gender gap."},
];


const BASE_CARDS=[
  {type:"quote",text:"I am no bird; and no net ensnares me. I am a free human being with an independent will.",author:"Charlotte Brontë"},
  {type:"affirm",text:"You are braver than you believe, stronger than you seem, and more talented than you think."},
  {type:"quote",text:"Well-behaved women seldom make history.",author:"Laurel Thatcher Ulrich"},
  {type:"encourage",text:"Your voice matters. Speak up, even when your voice shakes."},
  {type:"quote",text:"I raise up my voice not so I can shout, but so that those without a voice can be heard.",author:"Malala Yousafzai"},
  {type:"affirm",text:"You carry the strength of every woman who came before you."},
  {type:"quote",text:"Women belong in all places where decisions are being made.",author:"Ruth Bader Ginsburg"},
  {type:"encourage",text:"It is okay to be angry. It is okay to be loud. You belong here."},
];


// Country data — split into per-continent arrays to keep things light
const EUROPE={
  Iceland:{edu:"98% literacy, near-equal enrollment",wage:"14% gap",rep:"47.6% women in parliament",laws:"Equal pay law 2018",history:"1975 Women's Strike; world's first female elected president 1980",flag:"🇮🇸"},
  Sweden:{edu:"Near-perfect parity",wage:"7% gap",rep:"46.4% women in parliament",laws:"Consent-based rape law 2018",history:"Suffrage 1921; feminist foreign policy since 2014",flag:"🇸🇪"},
  Norway:{edu:"Near-equal enrollment",wage:"14.5% gap",rep:"45.4% women in parliament",laws:"Gender equality act 1978",history:"Suffrage 1913",flag:"🇳🇴"},
  Finland:{edu:"Women outnumber men in universities",wage:"16% gap",rep:"46% women in parliament",laws:"Equality Act 2014",history:"First female suffrage in Europe 1906",flag:"🇫🇮"},
  Denmark:{edu:"Women outnumber men in universities",wage:"13.8% gap",rep:"39.1% women in parliament",laws:"Equal pay law 1976",history:"Suffrage 1915",flag:"🇩🇰"},
  Germany:{edu:"Near-equal university access",wage:"18% gap",rep:"35.1% women in Bundestag",laws:"30% board quota",history:"Suffrage 1918; Merkel Chancellor 2005–2021",flag:"🇩🇪"},
  France:{edu:"Women outnumber men in universities",wage:"16.8% gap",rep:"37.6% women in National Assembly",laws:"Parity law for candidates",history:"Suffrage 1944; The Second Sex 1949",flag:"🇫🇷"},
  UK:{edu:"Women outnumber men in higher education",wage:"14.9% gap",rep:"35% women in House of Commons",laws:"Equality Act 2010",history:"Suffragette movement; full suffrage 1928",flag:"🇬🇧"},
  Spain:{edu:"Women outnumber men in universities",wage:"22% gap",rep:"47.4% women in Congress",laws:"Law against gender violence 2004",history:"Suffrage 1931; mass feminist strikes since 2018",flag:"🇪🇸"},
  Italy:{edu:"Women outnumber men in universities",wage:"17.5% gap",rep:"34.4% women in parliament",laws:"Domestic violence laws strengthened 2019",history:"Suffrage 1945; first female PM 2022",flag:"🇮🇹"},
  Netherlands:{edu:"Women outnumber men in universities",wage:"15.2% gap",rep:"40% women in parliament",laws:"Equal treatment law 1994",history:"Suffrage 1919",flag:"🇳🇱"},
  Poland:{edu:"Women outnumber men in universities",wage:"8% gap",rep:"28% women in parliament",laws:"Near-total abortion ban since 2021",history:"Suffrage 1918; Black Protests 2016/2020",flag:"🇵🇱"},
  Ireland:{edu:"Women outnumber men in universities",wage:"11% gap",rep:"23% women in Dáil",laws:"Gender quota 2012; abortion legalized 2018",history:"Repeal movement succeeded 2018",flag:"🇮🇪"},
  Belgium:{edu:"Women outnumber men in universities",wage:"10% gap",rep:"45% women in Chamber",laws:"Gender parity law",history:"Suffrage 1948",flag:"🇧🇪"},
  Switzerland:{edu:"Near-equal enrollment",wage:"18.4% gap",rep:"41.5% women in National Council",laws:"Gender equality law 1995",history:"Suffrage only in 1971",flag:"🇨🇭"},
  Austria:{edu:"Women outnumber men in universities",wage:"18.8% gap",rep:"39.3% women in National Council",laws:"Equal Treatment Act",history:"First female Chancellor 2019",flag:"🇦🇹"},
  Portugal:{edu:"Women outnumber men in universities",wage:"17% gap",rep:"38.7% women in parliament",laws:"DV law strengthened 2010",history:"Suffrage 1976",flag:"🇵🇹"},
  Greece:{edu:"Women outnumber men in universities",wage:"11% gap",rep:"21.3% women in parliament",laws:"DV law 2006",history:"Suffrage 1952",flag:"🇬🇷"},
  Ukraine:{edu:"Women outnumber men in universities",wage:"25% gap",rep:"21.8% women in parliament",laws:"DV law 2018",history:"Women central to wartime resistance since 2022",flag:"🇺🇦"},
  Turkey:{edu:"University gap closing",wage:"30% gap",rep:"17.4% women in parliament",laws:"Withdrew from Istanbul Convention 2021",history:"Suffrage 1934",flag:"🇹🇷"},
  Russia:{edu:"Women outnumber men in universities",wage:"30% gap",rep:"16% women in State Duma",laws:"DV decriminalized 2017",history:"Suffrage 1917",flag:"🇷🇺"},
  Romania:{edu:"Women outnumber men in universities",wage:"3% gap",rep:"19.7% women in parliament",laws:"DV law 2003",history:"Suffrage 1938",flag:"🇷🇴"},
  Hungary:{edu:"Women outnumber men in universities",wage:"14% gap",rep:"13% women in parliament",laws:"Some regression since 2010",history:"Suffrage 1945",flag:"🇭🇺"},
  Belarus:{edu:"Women outnumber men in universities",wage:"27% gap",rep:"40% women in parliament",laws:"DV law limited",history:"2020 protest movement led by Tsikhanouskaya",flag:"🇧🇾"},
};
const AMERICAS={
  USA:{edu:"Women outnumber men in higher education",wage:"18% gap",rep:"28.7% women in Congress",laws:"Title VII 1964",history:"Suffrage 1920; MeToo went viral 2017",flag:"🇺🇸"},
  Canada:{edu:"Women outnumber men in universities",wage:"16.7% gap",rep:"33.9% women in House of Commons",laws:"Pay Equity Act 2021",history:"Suffrage 1918",flag:"🇨🇦"},
  Brazil:{edu:"Women outperform men in universities",wage:"26% gap",rep:"17.7% women in lower chamber",laws:"Maria da Penha Law 2006",history:"First female president 2011",flag:"🇧🇷"},
  Mexico:{edu:"Women slightly outnumber men in universities",wage:"16% gap",rep:"50% women in congress",laws:"Femicide law 2012",history:"Feminist protests swept country 2020",flag:"🇲🇽"},
  Argentina:{edu:"Women outperform men in universities",wage:"27% gap",rep:"43.6% women in Chamber of Deputies",laws:"Abortion legalized 2020",history:"Ni Una Menos movement 2015",flag:"🇦🇷"},
  "Costa Rica":{edu:"Women slightly outnumber men in universities",wage:"20% gap",rep:"45.6% women in Legislative Assembly",laws:"Parity law since 2009",history:"Top in Latin America for gender equality",flag:"🇨🇷"},
  Cuba:{edu:"Women outnumber men in universities",wage:"30% gap",rep:"55.7% women in National Assembly",laws:"Equal pay guaranteed by law",history:"Suffrage 1934",flag:"🇨🇺"},
  Chile:{edu:"Women outnumber men in universities",wage:"21% gap",rep:"35.5% women in Chamber of Deputies",laws:"Partial abortion legalization",history:"Las Tesis performance went global 2019",flag:"🇨🇱"},
  Colombia:{edu:"Women outnumber men in universities",wage:"20% gap",rep:"31.6% women in Chamber",laws:"Femicide law 2015",history:"Gains through 2016 peace process",flag:"🇨🇴"},
  Peru:{edu:"Women slightly behind men in literacy",wage:"27% gap",rep:"31% women in Congress",laws:"Law against femicide 2013",history:"Dina Boluarte first female president 2022",flag:"🇵🇪"},
  Ecuador:{edu:"Women slightly outnumber men in universities",wage:"23% gap",rep:"45.4% women in National Assembly",laws:"Femicide law 2014",history:"Suffrage 1929, first in Latin America",flag:"🇪🇨"},
  Uruguay:{edu:"Women outnumber men in universities",wage:"17% gap",rep:"22% women in parliament",laws:"Abortion legal since 2012",history:"Suffrage 1932, first in South America",flag:"🇺🇾"},
  Bolivia:{edu:"84% female literacy vs 93% male",wage:"20% gap",rep:"44% women in parliament",laws:"Comprehensive law against violence 2013",history:"Suffrage 1952",flag:"🇧🇴"},
  Guatemala:{edu:"77% female literacy vs 83% male",wage:"40% gap",rep:"19.4% women in congress",laws:"Law against femicide 2008",history:"Suffrage 1945/1965",flag:"🇬🇹"},
  Nicaragua:{edu:"Girls outperform boys in schools",wage:"18% gap",rep:"51.7% women in National Assembly",laws:"Gender parity electoral law",history:"Women key to Sandinista revolution",flag:"🇳🇮"},
};
const AFRICA={
  Rwanda:{edu:"85% female literacy",wage:"25% gap",rep:"61.3% women in parliament — world's highest",laws:"Strong GBV laws",history:"Post-genocide reconstruction prioritized women's leadership",flag:"🇷🇼"},
  "South Africa":{edu:"Women outnumber men in universities",wage:"17% gap",rep:"45.8% women in parliament",laws:"DV Act 1998",history:"Central to anti-apartheid movement",flag:"🇿🇦"},
  Tanzania:{edu:"77% female literacy",wage:"22% gap",rep:"37.2% women in parliament",laws:"GBV laws in force",history:"First female president 2021",flag:"🇹🇿"},
  Namibia:{edu:"Near-equal literacy",wage:"30% gap",rep:"46.2% women in National Assembly",laws:"Rape Act 2000",history:"Top 10 globally for gender equality (WEF 2025)",flag:"🇳🇦"},
  Kenya:{edu:"82% female literacy",wage:"30% gap",rep:"22.8% women in parliament",laws:"30% representation mandated by constitution",history:"Wangari Maathai Nobel Peace Prize 2004",flag:"🇰🇪"},
  Ethiopia:{edu:"52% female literacy vs 62% male",wage:"40% gap",rep:"41.4% women in parliament",laws:"FGM criminalized",history:"Many female ministers appointed 2018",flag:"🇪🇹"},
  Nigeria:{edu:"62% female literacy vs 77% male",wage:"35% gap",rep:"4% women in senate",laws:"Violence Against Persons Act 2015",history:"Chibok kidnappings 2014",flag:"🇳🇬"},
  Egypt:{edu:"82% female literacy vs 89% male",wage:"35% gap",rep:"27.7% women in parliament",laws:"FGM criminalized 2008",history:"Women active in 2011 Arab Spring",flag:"🇪🇬"},
  Morocco:{edu:"68% female literacy vs 81% male",wage:"24% gap",rep:"24.3% women in parliament",laws:"Family code reformed 2004",history:"Suffrage 1963",flag:"🇲🇦"},
  Ghana:{edu:"80% female literacy",wage:"28% gap",rep:"14.5% women in parliament",laws:"DV Act 2007",history:"Strong market women networks",flag:"🇬🇭"},
  Senegal:{edu:"55% female literacy vs 70% male",wage:"35% gap",rep:"43.6% women in National Assembly",laws:"Gender parity law 2010",history:"First female PM 2013",flag:"🇸🇳"},
  Tunisia:{edu:"Near-equal university access",wage:"25% gap",rep:"26% women in parliament",laws:"Personal Status Code 1956",history:"Most legal rights of any Arab country",flag:"🇹🇳"},
  Algeria:{edu:"Women outnumber men in universities",wage:"30% gap",rep:"25.3% women in parliament",laws:"Family code based on guardianship",history:"Suffrage 1962",flag:"🇩🇿"},
  Mozambique:{edu:"55% female literacy vs 72% male",wage:"34% gap",rep:"42% women in parliament",laws:"DV law 2009",history:"Women's league active in liberation movement",flag:"🇲🇿"},
  Zimbabwe:{edu:"87% female literacy",wage:"30% gap",rep:"33.6% women in parliament",laws:"DV law 2006",history:"Suffrage 1957 for all",flag:"🇿🇼"},
  Uganda:{edu:"74% female literacy vs 82% male",wage:"32% gap",rep:"34.9% women in parliament",laws:"DV act 2010",history:"Winnie Byanyima prominent feminist leader",flag:"🇺🇬"},
};
const ASIA={
  India:{edu:"70% female literacy vs 84% male",wage:"27% gap",rep:"15.2% women in lower house",laws:"DV act 2005",history:"First female PM 1966",flag:"🇮🇳"},
  China:{edu:"Women outnumber men in some universities",wage:"22% gap",rep:"24.9% women in National People's Congress",laws:"DV law 2016",history:"MeToo emerged 2018",flag:"🇨🇳"},
  Japan:{edu:"Women lag in STEM enrollment",wage:"22% gap",rep:"10.3% women in parliament",laws:"Equal Employment Law 1986",history:"Womenomics policy 2013",flag:"🇯🇵"},
  "South Korea":{edu:"Women outnumber men in some universities",wage:"31% gap",rep:"19% women in National Assembly",laws:"Gender Equality Employment Act",history:"Feminist movements growing 2020s",flag:"🇰🇷"},
  Vietnam:{edu:"95% female literacy",wage:"13% gap",rep:"30.3% women in National Assembly",laws:"Law on Gender Equality 2006",history:"Women central to resistance wars",flag:"🇻🇳"},
  Philippines:{edu:"Women outperform men in literacy and higher education",wage:"11% gap",rep:"27.2% women in congress",laws:"Magna Carta of Women 2009",history:"Two female presidents",flag:"🇵🇭"},
  "Saudi Arabia":{edu:"97% female literacy",wage:"34% gap",rep:"19.9% women in Shura Council",laws:"Women drive since 2018",history:"Loujain al-Hathloul imprisoned for advocacy",flag:"🇸🇦"},
  Iran:{edu:"Women outnumber men in universities",wage:"39% gap",rep:"5.9% women in parliament",laws:"Hijab mandatory by law",history:"Mahsa Amini protests 2022",flag:"🇮🇷"},
  Afghanistan:{edu:"Girls banned from education past 6th grade since 2021",wage:"Women excluded from formal economy",rep:"Women banned from public life",laws:"Full covering required",history:"Taliban takeover 2021 reversed gains",flag:"🇦🇫"},
  Pakistan:{edu:"51% female literacy vs 71% male",wage:"35% gap",rep:"20% women in National Assembly",laws:"Protection Against Harassment Act 2010",history:"First female PM in Muslim-majority country 1988",flag:"🇵🇰"},
  Indonesia:{edu:"95% female literacy",wage:"20% gap",rep:"21.9% women in parliament",laws:"DV law 2004",history:"First female president 2001",flag:"🇮🇩"},
  Thailand:{edu:"Near-equal literacy",wage:"15% gap",rep:"16.2% women in parliament",laws:"DV Act 2007",history:"Strong women-led NGO sector",flag:"🇹🇭"},
  Malaysia:{edu:"Women outnumber men in universities",wage:"18% gap",rep:"13.9% women in parliament",laws:"DV act 1994",history:"Suffrage 1957",flag:"🇲🇾"},
  Bangladesh:{edu:"78% female literacy",wage:"28% gap",rep:"21% women in parliament",laws:"DV law 2010",history:"Female heads of government 30+ years",flag:"🇧🇩"},
  Nepal:{edu:"68% female literacy vs 80% male",wage:"36% gap",rep:"33.5% women in parliament",laws:"DV law 2009",history:"First female president 2015",flag:"🇳🇵"},
  Israel:{edu:"Women outnumber men in universities",wage:"22% gap",rep:"30% women in Knesset",laws:"Equal rights law 1951",history:"Golda Meir was PM 1969–1974",flag:"🇮🇱"},
  UAE:{edu:"Women outnumber men in universities",wage:"30% gap despite high education",rep:"50% women in Federal National Council",laws:"DV law 2019",history:"Women gained vote 2006",flag:"🇦🇪"},
  Jordan:{edu:"97% female literacy",wage:"36% gap",rep:"15.4% women in parliament",laws:"Personal status law",history:"Queen Rania advocates internationally",flag:"🇯🇴"},
};
const OCEANIA={
  "New Zealand":{edu:"Women outnumber men in universities",wage:"9.2% gap",rep:"50% women in parliament",laws:"Equal Pay Act 1972",history:"First to grant women the vote 1893",flag:"🇳🇿"},
  Australia:{edu:"Women outnumber men in universities",wage:"13% gap",rep:"38% women in federal parliament",laws:"Sex Discrimination Act 1984",history:"First female PM 2010",flag:"🇦🇺"},
  Fiji:{edu:"Near-equal literacy",wage:"32% gap",rep:"19.6% women in parliament",laws:"DV Act 2009",history:"Suffrage 1963",flag:"🇫🇯"},
  Samoa:{edu:"Girls outperform boys in school",wage:"28% gap",rep:"10% women in parliament",laws:"Family Safety Act 2013",history:"First female PM 2021",flag:"🇼🇸"},
  Tonga:{edu:"Women outnumber men in secondary education",wage:"30% gap",rep:"3% women in parliament",laws:"Family Protection Act 2013",history:"Deeply patriarchal hereditary system",flag:"🇹🇴"},
  "Papua New Guinea":{edu:"63% female literacy vs 72% male",wage:"Large gap",rep:"4% women in parliament",laws:"DV criminalized 2013",history:"One of world's highest GBV rates",flag:"🇵🇬"},
};


function buildCountries(){
  const out={};
  for(const k in EUROPE) out[k]={cont:"Europe",...EUROPE[k]};
  for(const k in AMERICAS) out[k]={cont:"Americas",...AMERICAS[k]};
  for(const k in AFRICA) out[k]={cont:"Africa",...AFRICA[k]};
  for(const k in ASIA) out[k]={cont:"Asia",...ASIA[k]};
  for(const k in OCEANIA) out[k]={cont:"Oceania",...OCEANIA[k]};
  return out;
}
const COUNTRIES=buildCountries();
const CMAP={Europe:"#9d174d",Asia:"#be185d",Africa:"#b45309",Americas:"#0f766e",Oceania:"#065f46"};


// ─── Shared UI ──────────────────────────────────────────────────
function Tag({label,color}){
  const c=color||ACCENT;
  return <span style={{fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:c,background:c+"22",padding:"3px 10px",display:"inline-block"}}>{label}</span>;
}
function SectionHero({title,italic,sub}){
  return(
    <div style={{background:PINK,padding:"52px 40px",textAlign:"center",marginBottom:40}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:36,fontWeight:400,color:TEXT,margin:"0 0 8px",lineHeight:1.2}}>{title} <em>{italic}</em></h1>
      {sub&&<p style={{color:DARK,fontSize:15,margin:"10px auto 0",maxWidth:520,lineHeight:1.7}}>{sub}</p>}
    </div>
  );
}
function AskBox({topic}){
  const [q,setQ]=useState("");const [a,setA]=useState(null);const [ld,setLd]=useState(false);
  function ask(){
    if(!q.trim())return; setLd(true); setA(null);
    fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:500,messages:[{role:"user",content:"You are an educator on gender equality and "+topic+". Answer in 3-4 sentences, ending with one empowering sentence. Question: "+q}]})})
      .then(r=>r.json()).then(d=>{setA(d.content.map(i=>i.text||"").join(""));setLd(false);}).catch(()=>{setA("Something went wrong.");setLd(false);});
  }
  return(
    <div style={{marginTop:32,borderTop:"1px solid "+BORDER,paddingTop:24}}>
      <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,marginBottom:10}}>Have a question about this topic?</p>
      <div style={{display:"flex",gap:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask anything..." style={{flex:1,border:"1px solid "+BORDER,padding:"8px 12px",fontSize:14,fontFamily:"inherit",color:TEXT,outline:"none"}}/>
        <button onClick={ask} disabled={ld||!q.trim()} style={{background:DARK,color:"#fff",border:"none",padding:"8px 20px",cursor:"pointer",fontSize:13,opacity:ld||!q.trim()?0.6:1}}>{ld?"...":"Ask"}</button>
      </div>
      {a&&<div style={{marginTop:12,padding:"14px 16px",background:LPINK,borderLeft:"3px solid "+GOLD,fontSize:14,lineHeight:1.8,color:TEXT}}>{a}</div>}
    </div>
  );
}
function Bar({label,val,max,unit,color,delay}){
  const pct=Math.min(100,(val/max)*100);
  const [animated,setAnimated]=useState(false);
  useEffect(function(){
    const t=setTimeout(function(){setAnimated(true);},(delay||0)*80+50);
    return function(){clearTimeout(t);};
  },[]);
  return(
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:12,color:TEXT,lineHeight:1.4,paddingRight:8}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color,flexShrink:0}}>{val}{unit}</span>
      </div>
      <div style={{height:8,background:color+"22",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:(animated?pct:0)+"%",background:"linear-gradient(90deg,"+color+"cc,"+color+")",borderRadius:4,transition:"width 1.3s cubic-bezier(0.16,1,0.3,1)"}}/>
      </div>
    </div>
  );
}
function Donut({pct,label,color,delay}){
  const r=28,circ=2*Math.PI*r;
  const [animated,setAnimated]=useState(false);
  useEffect(function(){
    const t=setTimeout(function(){setAnimated(true);},(delay||0)*80+50);
    return function(){clearTimeout(t);};
  },[]);
  const dash=((animated?pct:0)/100)*circ;
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,marginRight:16,marginBottom:8}}>
      <svg width="64" height="64" viewBox="0 0 64 64" style={{flexShrink:0}}>
        <circle cx="32" cy="32" r={r} fill="none" stroke={color+"22"} strokeWidth="7"/>
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="7" strokeDasharray={dash+" "+(circ-dash)} strokeDashoffset={circ*0.25} strokeLinecap="round" style={{transition:"stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1)"}}/>
        <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="700" fill={color} style={{opacity:animated?1:0,transition:"opacity 0.7s ease 0.45s"}}>{pct}%</text>
      </svg>
      <span style={{fontSize:11,color:MUTED,maxWidth:80,lineHeight:1.5}}>{label}</span>
    </div>
  );
}


// ─── Pages ──────────────────────────────────────────────────────
function KnowledgePage(){
  const [open,setOpen]=useState(null);
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Knowledge" italic="Hub" sub="Explore gender inequality across history, culture, media, and global data."/>
      {KNOW.map((t,i)=>(
          <div key={i} style={{borderBottom:"1px solid "+BORDER,background:PINK_KNOWLEDGE_TAGS.includes(t.tag)?LPINK:"#fff",padding:"0 16px"}}>          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"18px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}><Tag label={t.tag}/><span style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT}}>{t.title}</span></div>
            <span style={{color:MUTED,fontSize:11,marginLeft:12}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{paddingBottom:18}}>
              <p style={{fontSize:14,lineHeight:1.85,color:TEXT,margin:"0 0 14px"}}>{t.content}</p>
              {t.extra&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:BORDER,marginBottom:12}}>
                    {t.extra.cols.map((col,j)=>(
                      <div key={j} style={{background:col.bg,padding:"16px"}}>
                        <p style={{fontWeight:700,color:col.color,fontSize:13,margin:"0 0 10px"}}>{col.label}</p>
                        <ul style={{margin:0,paddingLeft:16}}>
                          {col.points.map((pt,k)=><li key={k} style={{fontSize:12,marginBottom:6,lineHeight:1.65,color:TEXT}}>{pt}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#fefce8",border:"1px solid #fde047",padding:"10px 14px"}}>
                    <span style={{fontSize:12,color:"#854d0e"}}><strong>⚠️ Common myth:</strong> {t.extra.myth}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <AskBox topic="gender inequality, history, culture, and feminist theory"/>
    </div>
  );
}


function ExamplesPage(){
  const [open,setOpen]=useState(null);
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Recognizing" italic="Discrimination" sub="Gender discrimination appears in many forms. Learning to name it is the first step to ending it."/>
      {EXAMPS.map((cat,i)=>(
        <div key={i} style={{borderBottom:"1px solid "+BORDER,background:PINK_EXAMPLE_AREAS.includes(cat.area)?LPINK:"#fff",padding:"0 16px"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"18px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT}}>{cat.icon} {cat.area}</span>
            <span style={{color:MUTED,fontSize:11}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&<div style={{paddingBottom:18}}><ul style={{margin:0,paddingLeft:18}}>{cat.items.map((ex,j)=><li key={j} style={{fontSize:14,marginBottom:7,lineHeight:1.7,color:TEXT}}>{ex}</li>)}</ul></div>}
        </div>
      ))}
      <AskBox topic="examples and forms of gender discrimination"/>
    </div>
  );
}


function ConsequencesPage(){
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="The Cost of" italic="Inequality" sub="Gender inequality ripples across every dimension of society."/>
      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .cons-card { animation: fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; transition: box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1); }
        .cons-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(125,42,74,0.12); }
      `}</style>
      {CDATA.map((c,i)=>(
        <div key={i} className="cons-card" style={{background:"#fff",border:"1px solid "+BORDER,marginBottom:24,overflow:"hidden",animationDelay:(i*100)+"ms"}}>
          <div style={{background:c.color,padding:"14px 22px"}}>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:400,color:"#fff",margin:0}}>{c.title}</h3>
          </div>
          <div style={{padding:"20px 22px"}}>
            <p style={{fontSize:13,lineHeight:1.8,color:TEXT,margin:"0 0 18px"}}>{c.desc}</p>
            <div style={{display:"flex",flexWrap:"wrap",marginBottom:18}}>
              {c.donuts.map((d,j)=><Donut key={j} pct={d.pct} label={d.label} color={c.color} delay={j}/>)}
            </div>
            {c.bars.map((b,j)=><Bar key={j} label={b.label} val={b.val} max={b.max} unit={b.unit} color={c.color} delay={j+c.donuts.length}/>)}
          </div>
        </div>
      ))}
      <div style={{background:LPINK,padding:"22px 26px",borderLeft:"4px solid "+GOLD,marginBottom:24}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"0 0 6px",fontStyle:"italic"}}>"Equality is not a cost to bear — it is the profit the world forfeits every day it delays."</p>
        <p style={{fontSize:11,color:MUTED,margin:0,letterSpacing:"0.06em",textTransform:"uppercase"}}>UN Women Gender Snapshot 2025</p>
      </div>
      <AskBox topic="consequences of gender inequality and global data"/>
    </div>
  );
}


function HeroinesPage(){
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Women Who Changed" italic="the World" sub="Trailblazers from history and the activists shaping our present."/>
      <div className="heroines-grid" style={{background:BORDER,marginBottom:36}}>
        {HEROES.map((h,i)=>(
          <div key={i} className="heroine-card" style={{background:"#fff",padding:"22px"}}>
            <div className="heroine-identity">
              <img className="heroine-photo" src={h.image} alt={h.name} referrerPolicy="no-referrer" />
              <div>
                <h3 style={{fontFamily:"Georgia,serif",fontSize:14,fontWeight:400,margin:0,color:TEXT}}>{h.name}</h3>
                <p style={{fontSize:11,color:MUTED,margin:"2px 0 0"}}>{h.country} · {h.years}</p>
              </div>
            </div>
            <p style={{fontSize:13,lineHeight:1.75,color:TEXT,margin:"0 0 12px"}}>{h.action}</p>
            <a href={h.wiki} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:ACCENT,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",textDecoration:"none",borderBottom:"1px solid "+ACCENT}}>Read more →</a>
          </div>
        ))}
      </div>
      <AskBox topic="women who changed history and current feminist activists"/>
    </div>
  );
}


function ProjectsPage(){
  const [fTab,setFTab]=useState("fund");
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Funding &" italic="Projects" sub="Grant opportunities, investment tools, and volunteer projects advancing gender equality worldwide."/>
      <div style={{display:"flex",gap:1,background:BORDER,marginBottom:28}}>
        {[["fund","💰 Funding"],["vol","🤝 Volunteer"]].map(([id,l])=>(
          <button key={id} onClick={()=>setFTab(id)} style={{flex:1,padding:"12px",border:"none",cursor:"pointer",background:fTab===id?"#fff":LPINK,fontFamily:"Georgia,serif",fontSize:14,color:fTab===id?TEXT:MUTED,borderBottom:fTab===id?"2px solid "+DARK:"2px solid transparent"}}>{l}</button>
        ))}
      </div>
      {PROJECTS.filter(p=>fTab==="fund"?p.fund:!p.fund).map((p,i)=>(
        <div key={i} style={{borderBottom:"1px solid "+BORDER,padding:"22px 0",display:"flex",gap:14}}>
          <div style={{width:44,height:44,background:LPINK,border:"1px solid "+BORDER,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.icon}</div>
          <div style={{flex:1}}>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:400,margin:"0 0 2px",color:TEXT}}>{p.title}</h3>
            <p style={{fontSize:11,color:GOLD,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",margin:"0 0 8px"}}>{p.country}</p>
            <p style={{fontSize:13,lineHeight:1.75,color:TEXT,margin:"0 0 10px"}}>{p.desc}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:ACCENT,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",textDecoration:"none",borderBottom:"1px solid "+ACCENT}}>Visit →</a>
          </div>
        </div>
      ))}
      <AskBox topic="funding opportunities and volunteer projects for gender equality"/>
    </div>
  );
}


function HistoryPage(){
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="History of" italic="Feminism" sub="Four waves of feminist activism have reshaped the world."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:BORDER,marginBottom:36}}>
        {[["First Wave","1840s–1920s","#be185d"],["Second Wave","1960s–1980s","#7c3aed"],["Third Wave","1990s–2000s","#0f766e"],["Fourth Wave","2010s–now","#1e40af"]].map(([w,y,c])=>(
          <div key={w} style={{background:"#fff",padding:"14px",textAlign:"center"}}>
            <div style={{width:"100%",height:3,background:c,marginBottom:10}}/>
            <p style={{fontFamily:"Georgia,serif",fontSize:13,color:TEXT,margin:"0 0 3px"}}>{w}</p>
            <p style={{fontSize:11,color:MUTED,margin:0}}>{y}</p>
          </div>
        ))}
      </div>
      <div style={{paddingLeft:18,borderLeft:"2px solid "+BORDER}}>
        {TIMELINE.map((m,i)=>(
          <div key={i} style={{marginBottom:22,position:"relative"}}>
            <div style={{position:"absolute",left:-23,top:4,width:9,height:9,borderRadius:"50%",background:m.color,border:"2px solid #fff"}}/>
            <div style={{display:"flex",gap:14}}>
              <span style={{fontFamily:"Georgia,serif",fontSize:13,color:GOLD,minWidth:40,flexShrink:0}}>{m.year}</span>
              <div>
                <p style={{fontFamily:"Georgia,serif",fontSize:14,color:TEXT,margin:"0 0 3px"}}>{m.title}</p>
                <p style={{fontSize:13,color:MUTED,margin:0,lineHeight:1.65}}>{m.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AskBox topic="history of feminism and women's rights movements"/>
    </div>
  );
}


function YouAreHeardPage(){
  const [story,setStory]=useState("");
  const [cat,setCat]=useState("experience");
  const [stories,setStories]=useState([]);
  const [done,setDone]=useState(false);
  const cats=[
    {id:"experience",label:"My Experience",icon:"💬",color:"#c45c82"},
    {id:"strength",label:"Moment of Strength",icon:"💪",color:"#15803d"},
    {id:"message",label:"Message to Others",icon:"🌸",color:"#1e40af"},
    {id:"anger",label:"I am Angry Because",icon:"🔥",color:"#b45309"},
  ];
  const selCat=cats.find(c=>c.id===cat)||cats[0];
  const prompts={
    experience:"Share an experience with gender inequality — at work, at home, in public, or anywhere.",
    strength:"Tell us about a moment you stood up, spoke out, or simply kept going.",
    message:"Leave a message of hope, solidarity, or wisdom for someone who needs it.",
    anger:"You are allowed to be angry. Tell us what makes you angry.",
  };
  function submit(){
    if(!story.trim())return;
    setStories(p=>[{text:story.trim(),cat:selCat.label,icon:selCat.icon,color:selCat.color,date:new Date().toLocaleDateString()},...p]);
    setStory("");setDone(true);setTimeout(()=>setDone(false),3000);
  }
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="You Are" italic="Heard" sub="A safe, anonymous space to share your story. Every voice matters."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:BORDER,marginBottom:24}}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{padding:"14px 8px",border:"none",cursor:"pointer",background:cat===c.id?c.color+"18":"#fff",borderBottom:cat===c.id?"2px solid "+c.color:"2px solid transparent",textAlign:"center",fontFamily:"inherit"}}>
            <div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
            <div style={{fontSize:11,fontWeight:cat===c.id?700:400,color:cat===c.id?c.color:MUTED,lineHeight:1.3}}>{c.label}</div>
          </button>
        ))}
      </div>
      <div style={{background:LPINK,padding:"24px",marginBottom:28,border:"1px solid "+BORDER}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"0 0 4px"}}>{selCat.icon} {selCat.label}</p>
        <p style={{fontSize:12,color:MUTED,margin:"0 0 14px",lineHeight:1.6}}>{prompts[cat]}</p>
        <textarea value={story} onChange={e=>setStory(e.target.value)} placeholder="Write here — your words are safe and anonymous..." style={{width:"100%",minHeight:120,border:"1px solid "+BORDER,padding:"12px",fontSize:14,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",background:"#fff",color:TEXT,lineHeight:1.7}}/>
        <div style={{display:"flex",alignItems:"center",gap:14,marginTop:12}}>
          <button onClick={submit} disabled={!story.trim()} style={{background:selCat.color,color:"#fff",border:"none",padding:"10px 24px",cursor:story.trim()?"pointer":"not-allowed",fontSize:13,fontWeight:500,opacity:story.trim()?1:0.5}}>Share anonymously</button>
          <p style={{fontSize:11,color:MUTED,margin:0}}>No account needed. No data stored.</p>
        </div>
        {done&&(
          <div style={{marginTop:14,background:"#fff",border:"1px solid "+selCat.color,padding:"10px 14px",borderLeft:"3px solid "+selCat.color}}>
            <p style={{fontSize:13,color:selCat.color,margin:0,fontWeight:500}}>✓ Your story has been shared. Thank you for your courage. 🩷</p>
          </div>
        )}
      </div>
      {stories.length===0?(
        <div style={{textAlign:"center",padding:"48px 0",borderTop:"1px solid "+BORDER}}>
          <p style={{fontSize:32,margin:"0 0 12px"}}>🌸</p>
          <p style={{fontFamily:"Georgia,serif",fontSize:16,color:MUTED,fontStyle:"italic",margin:0}}>Be the first to share. Your story matters.</p>
        </div>
      ):(
        <div>
          <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"0 0 16px"}}>Stories shared this session ({stories.length})</p>
          {stories.map((s,i)=>(
            <div key={i} style={{borderBottom:"1px solid "+BORDER,padding:"20px 0",display:"flex",gap:14}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:s.color+"18",border:"1px solid "+s.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <Tag label={s.cat} color={s.color}/>
                  <span style={{fontSize:11,color:MUTED}}>Anonymous · {s.date}</span>
                </div>
                <p style={{fontSize:14,lineHeight:1.85,color:TEXT,margin:0}}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function CheckerPage(){
  const [input,setInput]=useState("");const [result,setResult]=useState(null);const [ld,setLd]=useState(false);
  const encouragements=[
    "Trusting your instincts is the first step. You deserve clarity, not confusion.",
    "Whatever the answer, your feelings about this situation are valid.",
    "Asking the question already shows self-awareness and strength.",
    "You are not overreacting by wanting to understand this better.",
    "Naming an experience is powerful — it's how change begins.",
  ];
  const [encIdx]=useState(function(){return Math.floor(Math.random()*encouragements.length);});
  function analyze(){
    if(!input.trim())return; setLd(true); setResult(null);
    fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,messages:[{role:"user",content:"You are an expert on gender equality and a supportive, encouraging counselor. A user described: "+JSON.stringify(input)+". Analyze whether it reflects gender bias. Respond ONLY with a valid JSON object (no markdown) with: is_discrimination (boolean), verdict (1 sentence), explanation (2-3 sentences), encouragement (2-3 warm, empowering sentences directly encouraging the user, regardless of the verdict), tip (1 practical sentence)."}]})})
    .then(r=>r.json()).then(d=>{const txt=d.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim();setResult(JSON.parse(txt));setLd(false);}).catch(()=>{setResult({error:true});setLd(false);});
  }
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Discrimination" italic="Checker" sub="Describe a situation and we'll help you understand whether it reflects gender bias — with knowledge, context, and support."/>
      <div style={{background:LPINK,padding:"24px",marginBottom:24}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"0 0 6px"}}>Describe a situation or behavior</p>
        <p style={{fontSize:12,color:MUTED,margin:"0 0 14px",lineHeight:1.6}}>e.g. "My manager always interrupts female colleagues but not male ones."</p>
        <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Write your situation here..." style={{width:"100%",minHeight:110,border:"1px solid "+BORDER,padding:"10px",fontSize:14,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",background:"#fff",color:TEXT}}/>
        <button onClick={analyze} disabled={ld||!input.trim()} style={{marginTop:12,background:DARK,color:"#fff",border:"none",padding:"10px 24px",cursor:ld||!input.trim()?"not-allowed":"pointer",fontSize:13,fontWeight:500,opacity:ld||!input.trim()?0.5:1}}>{ld?"Analysing...":"Analyse situation"}</button>
      </div>


      {!result&&!ld&&(
        <div style={{background:"#fff",border:"1px solid "+BORDER,borderLeft:"4px solid "+GOLD,padding:"18px 22px",marginBottom:24}}>
          <p style={{fontSize:11,color:MUTED,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 8px"}}>💛 A gentle reminder</p>
          <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:0,fontStyle:"italic",lineHeight:1.7}}>{encouragements[encIdx]}</p>
        </div>
      )}


      {result&&!result.error&&(
        <div style={{border:"1px solid "+BORDER,overflow:"hidden"}}>
          <div style={{background:result.is_discrimination?"#be185d":"#0f766e",padding:"14px 22px"}}>
            <p style={{color:"#fff",fontFamily:"Georgia,serif",fontSize:16,margin:0}}>{result.is_discrimination?"⚠️ Gender bias detected":"✅ Let's explore this together"}</p>
          </div>
          <div style={{padding:"22px"}}>
            <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"0 0 12px",fontStyle:"italic"}}>"{result.verdict}"</p>
            <p style={{fontSize:13,lineHeight:1.8,color:TEXT,margin:"0 0 14px"}}>{result.explanation}</p>
            <div style={{background:"linear-gradient(135deg,#fce7f3,#fdf2f8)",borderLeft:"3px solid "+GOLD,padding:"16px 18px",marginBottom:14}}>
              <p style={{fontSize:11,color:DARK,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 8px"}}>💪 For you</p>
              <p style={{fontSize:14,lineHeight:1.8,color:TEXT,margin:0,fontStyle:"italic"}}>{result.encouragement}</p>
            </div>
            <p style={{fontSize:12,color:MUTED,margin:0}}><strong style={{color:TEXT}}>Practical tip:</strong> {result.tip}</p>
          </div>
        </div>
      )}
      {result&&result.error&&<p style={{color:"#be185d",fontSize:13}}>Something went wrong. Please try again.</p>}
    </div>
  );
}


function FlashcardsPage(){
  const [deck,setDeck]=useState(BASE_CARDS);
  const [ci,setCi]=useState(0);const [flip,setFlip]=useState(false);
  const [tab,setTab]=useState("browse");
  const [newText,setNewText]=useState("");const [newType,setNewType]=useState("affirm");const [newAuthor,setNewAuthor]=useState("");const [added,setAdded]=useState(false);
  const card=deck[ci%deck.length];
  const ccMap={quote:{bg:"#fce7f3",border:"#be185d",label:"Quote"},affirm:{bg:"#dcfce7",border:"#15803d",label:"Affirmation"},encourage:{bg:"#dbeafe",border:"#1e40af",label:"Encouragement"}};
  const cc=ccMap[card.type]||ccMap.affirm;
  function next(){setFlip(false);setTimeout(()=>setCi(i=>(i+1)%deck.length),100);}
  function prev(){setFlip(false);setTimeout(()=>setCi(i=>(i-1+deck.length)%deck.length),100);}
  function addCard(){
    if(!newText.trim())return;
    const nc={type:newType,text:newText.trim()};
    if(newType==="quote"&&newAuthor.trim())nc.author=newAuthor.trim();
    const nd=[...deck,nc];setDeck(nd);setCi(nd.length-1);setFlip(false);setNewText("");setNewAuthor("");setAdded(true);setTimeout(()=>setAdded(false),2500);
  }
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Quotes &" italic="Affirmations" sub="Words to inspire, affirm, and encourage. Browse the deck or add your own."/>
      <div style={{display:"flex",gap:1,background:BORDER,marginBottom:28}}>
        {[["browse","📖 Browse Cards"],["add","✏️ Add Your Own"]].map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"12px",border:"none",cursor:"pointer",background:tab===id?"#fff":LPINK,fontFamily:"Georgia,serif",fontSize:14,color:tab===id?TEXT:MUTED,borderBottom:tab===id?"2px solid "+DARK:"2px solid transparent"}}>{l}</button>
        ))}
      </div>
      {tab==="browse"&&(
        <div>
          <div onClick={()=>setFlip(f=>!f)} style={{border:"1px solid "+(flip?cc.border:BORDER),padding:"36px 28px",textAlign:"center",cursor:"pointer",background:flip?cc.bg:LPINK,minHeight:160,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginBottom:20}}>
            {!flip
              ?<><p style={{fontFamily:"Georgia,serif",fontSize:16,color:MUTED,fontStyle:"italic",margin:"0 0 10px"}}>Click to reveal</p><Tag label={cc.label} color={cc.border}/></>
              :<><Tag label={cc.label} color={cc.border}/><p style={{fontFamily:"Georgia,serif",fontSize:17,color:TEXT,lineHeight:1.7,margin:"14px 0 10px",fontStyle:card.type==="quote"?"italic":"normal"}}>"{card.text}"</p>{card.author&&<p style={{fontSize:12,color:MUTED,letterSpacing:"0.06em",textTransform:"uppercase",margin:0}}>— {card.author}</p>}</>
            }
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:8}}>
            <button onClick={prev} style={{border:"1px solid "+BORDER,background:"#fff",padding:"8px 18px",cursor:"pointer",fontSize:13,color:TEXT}}>← Prev</button>
            <button onClick={()=>{setFlip(false);setCi(Math.floor(Math.random()*deck.length));}} style={{border:"1px solid "+DARK,background:DARK,color:"#fff",padding:"8px 18px",cursor:"pointer",fontSize:13}}>Random</button>
            <button onClick={next} style={{border:"1px solid "+BORDER,background:"#fff",padding:"8px 18px",cursor:"pointer",fontSize:13,color:TEXT}}>Next →</button>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:MUTED,marginBottom:20}}>{(ci%deck.length)+1} of {deck.length} cards</p>
          {deck.length>BASE_CARDS.length&&(
            <div>
              <p style={{fontFamily:"Georgia,serif",fontSize:14,color:TEXT,margin:"0 0 12px"}}>Your added cards</p>
              {deck.slice(BASE_CARDS.length).map((c,i)=>(
                <div key={i} style={{borderBottom:"1px solid "+BORDER,padding:"12px 0",display:"flex",alignItems:"flex-start",gap:10}}>
                  <Tag label={(ccMap[c.type]&&ccMap[c.type].label)||"Card"} color={(ccMap[c.type]&&ccMap[c.type].border)||ACCENT}/>
                  <div style={{flex:1}}>
                    <p style={{fontSize:13,color:TEXT,margin:"0 0 2px",fontStyle:c.type==="quote"?"italic":"normal"}}>"{c.text}"</p>
                    {c.author&&<p style={{fontSize:11,color:MUTED,margin:0}}>— {c.author}</p>}
                  </div>
                  <button onClick={()=>{const nd=deck.filter((_,j)=>j!==BASE_CARDS.length+i);setDeck(nd);setCi(0);setFlip(false);}} style={{border:"none",background:"none",color:MUTED,cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {tab==="add"&&(
        <div>
          <div style={{background:LPINK,padding:"24px",border:"1px solid "+BORDER}}>
            <p style={{fontFamily:"Georgia,serif",fontSize:16,color:TEXT,margin:"0 0 16px"}}>Add a card to the deck</p>
            <p style={{fontSize:11,color:MUTED,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 8px"}}>Card type</p>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {[["affirm","Affirmation","#15803d"],["encourage","Encouragement","#1e40af"],["quote","Quote","#be185d"]].map(([t,l,c])=>(
                <button key={t} onClick={()=>setNewType(t)} style={{flex:1,padding:"8px",border:"1px solid "+(newType===t?c:BORDER),background:newType===t?c+"18":"#fff",color:newType===t?c:MUTED,cursor:"pointer",fontSize:12,fontWeight:newType===t?600:400}}>{l}</button>
              ))}
            </div>
            <p style={{fontSize:11,color:MUTED,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 6px"}}>{newType==="quote"?"Quote text":"Your message"}</p>
            <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder={newType==="quote"?"Enter the quote here...":newType==="affirm"?"Write an affirmation...":"Write an encouraging message..."} style={{width:"100%",minHeight:90,border:"1px solid "+BORDER,padding:"10px",fontSize:14,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",background:"#fff",color:TEXT,marginBottom:12}}/>
            {newType==="quote"&&(
              <div style={{marginBottom:12}}>
                <p style={{fontSize:11,color:MUTED,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 6px"}}>Author (optional)</p>
                <input value={newAuthor} onChange={e=>setNewAuthor(e.target.value)} placeholder="e.g. Maya Angelou" style={{width:"100%",border:"1px solid "+BORDER,padding:"8px 10px",fontSize:13,fontFamily:"inherit",background:"#fff",color:TEXT,boxSizing:"border-box"}}/>
              </div>
            )}
            {newText.trim()&&(
              <div style={{border:"1px solid "+((ccMap[newType]&&ccMap[newType].border)||ACCENT),background:(ccMap[newType]&&ccMap[newType].bg)||LPINK,padding:"16px 20px",marginBottom:14,textAlign:"center"}}>
                <Tag label={(ccMap[newType]&&ccMap[newType].label)||"Card"} color={(ccMap[newType]&&ccMap[newType].border)||ACCENT}/>
                <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"10px 0 6px",fontStyle:newType==="quote"?"italic":"normal"}}>"{newText}"</p>
                {newAuthor&&<p style={{fontSize:11,color:MUTED,margin:0}}>— {newAuthor}</p>}
              </div>
            )}
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <button onClick={addCard} disabled={!newText.trim()} style={{background:DARK,color:"#fff",border:"none",padding:"10px 24px",cursor:newText.trim()?"pointer":"not-allowed",fontSize:13,fontWeight:500,opacity:newText.trim()?1:0.5}}>Add to deck</button>
              {added&&<span style={{color:"#15803d",fontSize:13,fontWeight:500}}>✓ Added!</span>}
            </div>
          </div>
          <div style={{marginTop:16,padding:"16px 20px",background:"#fff",border:"1px solid "+BORDER}}>
            <p style={{fontFamily:"Georgia,serif",fontSize:14,color:TEXT,margin:"0 0 6px"}}>Your deck has <strong>{deck.length}</strong> cards</p>
            <button onClick={()=>{setTab("browse");setCi(deck.length-1);setFlip(false);}} style={{border:"1px solid "+DARK,background:"none",color:DARK,padding:"7px 16px",cursor:"pointer",fontSize:12,fontWeight:500}}>Browse your deck →</button>
          </div>
        </div>
      )}
    </div>
  );
}


function MapPage(){
  const [selC,setSelC]=useState(null);const [cA,setCA]=useState("");const [cB,setCB]=useState("");
  const [searchA,setSearchA]=useState("");const [searchB,setSearchB]=useState("");
  const [showDropA,setShowDropA]=useState(false);const [showDropB,setShowDropB]=useState(false);
  const [mTab,setMTab]=useState("browse");const [filt,setFilt]=useState("All");
  const allConts=["All","Europe","Asia","Africa","Americas","Oceania"];
  const filteredC=Object.entries(COUNTRIES).filter(function(e){return filt==="All"||e[1].cont===filt;});
  const sortedNames=Object.keys(COUNTRIES).sort();
  function matches(name,query){return name.toLowerCase().indexOf(query.toLowerCase())!==-1;}
  const optsA=sortedNames.filter(function(n){return matches(n,searchA);});
  const optsB=sortedNames.filter(function(n){return matches(n,searchB);});
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 44px"}}>
      <SectionHero title="Gender Equality" italic="by Country" sub="Explore profiles for 80+ countries. Filter by region or compare two countries."/>
      <div style={{display:"flex",gap:1,background:BORDER,marginBottom:24}}>
        {[["browse","Browse Countries"],["compare","Compare Two"]].map(([id,l])=>(
          <button key={id} onClick={()=>setMTab(id)} style={{flex:1,padding:"12px",border:"none",cursor:"pointer",background:mTab===id?"#fff":LPINK,fontFamily:"Georgia,serif",fontSize:13,color:mTab===id?TEXT:MUTED,borderBottom:mTab===id?"2px solid "+DARK:"2px solid transparent"}}>{l}</button>
        ))}
      </div>
      {mTab==="browse"&&(
        <div>
          <div style={{width:"100%",marginBottom:4,border:"1px solid "+BORDER,overflow:"hidden",background:"#d4eaf5"}}>
            <svg viewBox="0 0 1000 500" width="100%" style={{display:"block"}}>
              <rect width="1000" height="500" fill="#c8dff0"/>
              <path d="M80,80 L200,70 L230,100 L240,160 L210,200 L190,230 L170,240 L150,220 L130,200 L100,180 L80,140 Z" fill="#f9c4d8" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Americas")} style={{cursor:"pointer"}} opacity={filt==="Americas"?1:0.7}/>
              <path d="M170,260 L210,250 L230,270 L235,320 L220,370 L200,390 L175,380 L155,340 L150,290 Z" fill="#f9c4d8" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Americas")} style={{cursor:"pointer"}} opacity={filt==="Americas"?1:0.7}/>
              <path d="M420,60 L480,55 L510,75 L520,100 L500,120 L480,130 L450,125 L425,110 L415,85 Z" fill="#fce7f3" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Europe")} style={{cursor:"pointer"}} opacity={filt==="Europe"?1:0.7}/>
              <path d="M440,145 L510,140 L540,165 L550,220 L540,280 L510,320 L480,330 L450,310 L430,260 L420,200 L425,165 Z" fill="#ffe0cc" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Africa")} style={{cursor:"pointer"}} opacity={filt==="Africa"?1:0.7}/>
              <path d="M520,50 L700,40 L760,70 L780,110 L760,150 L720,170 L680,165 L640,150 L600,160 L570,145 L540,130 L520,100 Z" fill="#fce7f3" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Asia")} style={{cursor:"pointer"}} opacity={filt==="Asia"?1:0.7}/>
              <path d="M540,140 L600,135 L620,160 L610,190 L580,195 L555,180 L540,160 Z" fill="#fce7f3" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Asia")} style={{cursor:"pointer"}} opacity={filt==="Asia"?1:0.7}/>
              <path d="M700,160 L760,155 L780,175 L770,205 L740,215 L710,200 L695,180 Z" fill="#fce7f3" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Asia")} style={{cursor:"pointer"}} opacity={filt==="Asia"?1:0.7}/>
              <path d="M480,30 L780,20 L820,50 L800,80 L760,70 L700,40 L520,50 L480,60 Z" fill="#f0d0e8" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Europe")} style={{cursor:"pointer"}} opacity={filt==="Europe"?1:0.7}/>
              <path d="M760,310 L850,300 L890,330 L880,380 L840,400 L790,390 L760,360 L750,330 Z" fill="#d4f0e8" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Oceania")} style={{cursor:"pointer"}} opacity={filt==="Oceania"?1:0.7}/>
              <path d="M900,370 L915,360 L925,380 L910,400 L895,390 Z" fill="#d4f0e8" stroke="#fff" strokeWidth="1.5" onClick={()=>setFilt("Oceania")} style={{cursor:"pointer"}} opacity={filt==="Oceania"?1:0.7}/>
              <text x="155" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7d2a4a" style={{pointerEvents:"none"}}>Americas</text>
              <text x="468" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7d2a4a" style={{pointerEvents:"none"}}>Europe</text>
              <text x="485" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7d2a4a" style={{pointerEvents:"none"}}>Africa</text>
              <text x="650" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7d2a4a" style={{pointerEvents:"none"}}>Asia</text>
              <text x="820" y="355" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7d2a4a" style={{pointerEvents:"none"}}>Oceania</text>
              <text x="500" y="470" textAnchor="middle" fontSize="11" fill="#a06080" style={{pointerEvents:"none"}}>Click a continent to filter countries below</text>
            </svg>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,marginTop:10}}>
            {allConts.map(c=>(
              <button key={c} onClick={()=>{setFilt(c);setSelC(null);}} style={{border:"1px solid "+(filt===c?DARK:BORDER),background:filt===c?DARK:"#fff",color:filt===c?"#fff":MUTED,padding:"4px 12px",cursor:"pointer",fontSize:12,fontWeight:500}}>{c}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:BORDER}}>
            {filteredC.map(function(e){
              const name=e[0],d=e[1];
              return(
                <div key={name} onClick={()=>setSelC(selC===name?null:name)} style={{background:selC===name?LPINK:"#fff",padding:"14px",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:4}}>
                    <span style={{fontSize:18,flexShrink:0}}>{d.flag}</span>
                    <div>
                      <p style={{fontFamily:"Georgia,serif",fontSize:13,margin:"0 0 3px",color:TEXT}}>{name}</p>
                      <Tag label={d.cont} color={CMAP[d.cont]||ACCENT}/>
                    </div>
                  </div>
                  {selC===name&&(
                    <div style={{marginTop:10,borderTop:"1px solid "+BORDER,paddingTop:10}}>
                      {[["Education",d.edu],["Wage gap",d.wage],["Representation",d.rep],["Laws",d.laws],["History",d.history]].map(function(pair){
                        return(
                          <div key={pair[0]} style={{marginBottom:7}}>
                            <span style={{fontSize:10,fontWeight:600,color:MUTED,letterSpacing:"0.06em",textTransform:"uppercase"}}>{pair[0]}</span>
                            <p style={{fontSize:12,color:TEXT,margin:"2px 0 0",lineHeight:1.55}}>{pair[1]}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {mTab==="compare"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
            {[
              {val:cA,setVal:setCA,search:searchA,setSearch:setSearchA,showDrop:showDropA,setShowDrop:setShowDropA,opts:optsA,label:"Country A"},
              {val:cB,setVal:setCB,search:searchB,setSearch:setSearchB,showDrop:showDropB,setShowDrop:setShowDropB,opts:optsB,label:"Country B"},
            ].map(function(item,i){
              return(
                <div key={i} style={{position:"relative"}}>
                  <label style={{fontSize:10,color:MUTED,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:5}}>{item.label}</label>
                  <input
                    value={item.val?(COUNTRIES[item.val].flag+" "+item.val):item.search}
                    onChange={function(e){item.setVal("");item.setSearch(e.target.value);item.setShowDrop(true);}}
                    onFocus={function(){item.setShowDrop(true);if(item.val){item.setVal("");item.setSearch("");}}}
                    onBlur={function(){setTimeout(function(){item.setShowDrop(false);},150);}}
                    placeholder="Type to search a country..."
                    style={{width:"100%",border:"1px solid "+BORDER,padding:"8px 10px",fontSize:13,fontFamily:"inherit",background:"#fff",color:TEXT,boxSizing:"border-box"}}
                  />
                  {item.showDrop&&(
                    <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:10,background:"#fff",border:"1px solid "+BORDER,maxHeight:220,overflowY:"auto",boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}>
                      {item.opts.length===0&&<div style={{padding:"10px 12px",fontSize:12,color:MUTED}}>No countries found</div>}
                      {item.opts.map(function(n){
                        return(
                          <div key={n}
                            onMouseDown={function(){item.setVal(n);item.setSearch("");item.setShowDrop(false);}}
                            style={{padding:"8px 12px",fontSize:13,color:TEXT,cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid "+BORDER}}
                            onMouseEnter={function(e){e.currentTarget.style.background=LPINK;}}
                            onMouseLeave={function(e){e.currentTarget.style.background="#fff";}}
                          >
                            <span>{COUNTRIES[n].flag}</span><span>{n}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {cA&&cB&&COUNTRIES[cA]&&COUNTRIES[cB]?(
            <div style={{border:"1px solid "+BORDER}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:BORDER}}>
                {[cA,cB].map(function(name){
                  return(
                    <div key={name} style={{background:PINK,padding:"18px",textAlign:"center"}}>
                      <div style={{fontSize:26}}>{COUNTRIES[name].flag}</div>
                      <p style={{fontFamily:"Georgia,serif",fontSize:15,color:TEXT,margin:"5px 0 3px"}}>{name}</p>
                      <Tag label={COUNTRIES[name].cont} color={DARK}/>
                    </div>
                  );
                })}
              </div>
              {[["Education","edu"],["Wage gap","wage"],["Representation","rep"],["Laws","laws"],["History","history"]].map(function(pair){
                const label=pair[0],key=pair[1];
                return(
                  <div key={key} style={{borderTop:"1px solid "+BORDER}}>
                    <div style={{background:LPINK,padding:"8px 14px"}}><Tag label={label}/></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:BORDER}}>
                      {[cA,cB].map(function(name){
                        return(
                          <div key={name} style={{background:"#fff",padding:"10px 14px"}}>
                            <p style={{fontSize:12,color:TEXT,margin:0,lineHeight:1.65}}>{COUNTRIES[name][key]}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ):(
            <p style={{textAlign:"center",color:MUTED,fontFamily:"Georgia,serif",fontSize:15,fontStyle:"italic",padding:"36px 0"}}>Select two countries above to compare.</p>
          )}
          <AskBox topic="gender equality by country and international data"/>
        </div>
      )}
    </div>
  );
}


// ─── App ──────────────────────────────────────────────────────────
export default function App(){
  const [page, setPage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  function go(id){
    if(id===page)return;
    setPage(id);
  }
  const navItems = [
    ["knowledge", "📚", "Knowledge"],
    ["examples", "⚖️", "Discrimination"],
    ["consequences", "📊", "Consequences"],
    ["heroines", "🌟", "Heroines"],
    ["projects", "💰", "Funding"],
    ["history", "🕰️", "History"],
    ["checker", "🔍", "Checker"],
    ["flashcards", "💌", "Flashcards"],
    ["map", "🌍", "World Map"],
  ];
  function navBtn(id, icon, label) {
    const active = page === id;

    return (
      <button
        key={id}
        onClick={() => go(id)}
        className={"nav-icon-btn" + (active ? " active" : "")}
        title={label}
      >
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
      </button>
    );
  }
  return(
    <div style={{fontFamily:"system-ui,sans-serif",minHeight:"100vh",background:"#fff",color:TEXT}}>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        ${HEROINES_STYLES}
        @keyframes sectionIn {
          from {
            opacity: 0;
            transform: translateY(8px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes contentIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-wrap {
          animation: sectionIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: opacity, transform, filter;
        }

        .page-wrap > div > *:not(style),
        .page-wrap [style*="display: grid"] > *,
        .page-wrap .heroines-grid > * {
          animation: contentIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: opacity, transform;
        }

        .page-wrap > div > *:not(style):nth-child(1),
        .page-wrap [style*="display: grid"] > *:nth-child(1),
        .page-wrap .heroines-grid > *:nth-child(1) {
          animation-delay: 0.04s;
        }

        .page-wrap > div > *:not(style):nth-child(2),
        .page-wrap [style*="display: grid"] > *:nth-child(2),
        .page-wrap .heroines-grid > *:nth-child(2) {
          animation-delay: 0.1s;
        }

        .page-wrap > div > *:not(style):nth-child(3),
        .page-wrap [style*="display: grid"] > *:nth-child(3),
        .page-wrap .heroines-grid > *:nth-child(3) {
          animation-delay: 0.16s;
        }

        .page-wrap > div > *:not(style):nth-child(4),
        .page-wrap [style*="display: grid"] > *:nth-child(4),
        .page-wrap .heroines-grid > *:nth-child(4) {
          animation-delay: 0.22s;
        }

        .page-wrap > div > *:not(style):nth-child(5),
        .page-wrap [style*="display: grid"] > *:nth-child(5),
        .page-wrap .heroines-grid > *:nth-child(5) {
          animation-delay: 0.28s;
        }

        .page-wrap > div > *:not(style):nth-child(6),
        .page-wrap [style*="display: grid"] > *:nth-child(6),
        .page-wrap .heroines-grid > *:nth-child(6) {
          animation-delay: 0.34s;
        }

        .page-wrap > div > *:not(style):nth-child(7),
        .page-wrap [style*="display: grid"] > *:nth-child(7),
        .page-wrap .heroines-grid > *:nth-child(7) {
          animation-delay: 0.4s;
        }

        .page-wrap > div > *:not(style):nth-child(8),
        .page-wrap [style*="display: grid"] > *:nth-child(8),
        .page-wrap .heroines-grid > *:nth-child(8) {
          animation-delay: 0.46s;
        }

        .page-wrap > div > *:not(style):nth-child(9),
        .page-wrap [style*="display: grid"] > *:nth-child(9) {
          animation-delay: 0.52s;
        }

        .page-wrap > div > *:not(style):nth-child(10),
        .page-wrap [style*="display: grid"] > *:nth-child(10) {
          animation-delay: 0.58s;
        }

        .page-wrap > div > *:not(style):nth-child(11),
        .page-wrap [style*="display: grid"] > *:nth-child(11) {
          animation-delay: 0.64s;
        }

        .page-wrap > div > *:not(style):nth-child(12),
        .page-wrap [style*="display: grid"] > *:nth-child(12) {
          animation-delay: 0.7s;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-wrap,
          .page-wrap > div > *:not(style),
          .page-wrap [style*="display: grid"] > *,
          .page-wrap .heroines-grid > * {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }

        .page-shell {
          position: relative;
          isolation: isolate;
          width: 100%;
        }

        .page-content {
          position: relative;
          z-index: 1;
        }

        .section-layout {
          --side-space: clamp(108px, calc((100vw - 1100px) / 2), 336px);
          display: grid;
          grid-template-columns: 1fr;
          align-items: stretch;
          padding-inline: var(--side-space);
        }

        .section-side {
          position: fixed;
          top: 0;
          bottom: 0;
          width: var(--side-space);
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center 72%;
          opacity: 0.95;
          pointer-events: none;
          z-index: 0;
        }

        .section-side-left {
          left: 0;
          background-color: rgb(150 173 216);
          background-image: url("${EQUALITY_LEFT_IMAGE}");
        }

        .section-side-right {
          right: 0;
          background-color: rgb(250 207 210);
          background-image: url("${EQUALITY_RIGHT_IMAGE}");
        }

        .section-center {
          min-width: 0;
          display: flex;
          justify-content: center;
          padding: 0;
        }

        .page-box {
          width: 100%;
          max-width: 1100px;
          background: #fff;
          border: 1px solid ${BORDER};
          box-shadow: 0 16px 40px rgba(125, 42, 74, 0.08);
          overflow: hidden;
        }

        @media (max-width: 820px) {
          .section-layout {
            --side-space: 0px;
            min-height: auto;
            padding-inline: 0;
          }

          .section-side {
            display: none;
          }

          .section-center {
            padding: 0;
          }
        }

        footer {
          position: relative;
          z-index: 2;
          margin-top: 0;
        }
        .home-page button {
          border-radius: 999px;
        }

        .home-hero {
          background-color: rgb(241 150 167);
          background-image: url("${homeHeroBg}");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }
        button { transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s; }
        button:hover { transform: translateY(-1px); }
        a { transition: opacity 0.2s; }
        .top-nav {
          background: #fff;
          border-bottom: 1px solid #f0b8d0;
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        
        .brand-btn {
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f4a7c3;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7d2a4a;
        }

        .brand-text {
          font-family: Georgia, serif;
          font-size: 11px;
          color: #7d2a4a;
          letter-spacing: 0.08em;
          line-height: 1.25;
          text-transform: uppercase;
          text-align: left;
        }

        .desktop-nav {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-icon-btn {
          height: 40px;
          width: 40px;
          padding: 0;
          overflow: hidden;

          display: flex;
          align-items: center;

          border-radius: 999px;
          border: 1px solid #f0b8d0;
          background: #fce7f3;
          color: #7d2a4a;
          cursor: pointer;

          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-icon-btn:hover,
        .nav-icon-btn.active {
          width: 165px;
        }

        .nav-icon {
          width: 40px;
          min-width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 17px;
          line-height: 1;
          text-align: center;
        }

        .nav-label {
          white-space: nowrap;
          opacity: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;

          transition: opacity 0.2s ease;
        }

        .nav-icon-btn:hover .nav-label,
        .nav-icon-btn.active .nav-label {
          opacity: 1;
        }

        .mobile-menu-btn {
          display: none;
          margin-left: auto;
          border: 1px solid #f0b8d0;
          background: #fce7f3;
          color: #7d2a4a;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(61, 26, 42, 0.28);
          z-index: 200;
        }

        .side-nav {
          margin-left: auto;
          width: 260px;
          height: 100%;
          background: #fff;
          padding: 20px;
          box-shadow: -12px 0 30px rgba(61, 26, 42, 0.18);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .side-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #7d2a4a;
          margin-bottom: 12px;
          font-family: Georgia, serif;
        }

        .side-header button,
        .side-nav button {
          border: none;
          background: none;
          text-align: left;
          padding: 12px 10px;
          color: #7d2a4a;
          cursor: pointer;
          border-radius: 10px;
          font-size: 13px;
        }

        .side-nav button:hover,
        .side-active {
          background: #fce7f3 !important;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .brand-text {
            font-size: 10px;
          }
        }
      `}</style>
      <nav className="top-nav">
        <button onClick={() => go("home")} className="brand-btn">
          <div className="brand-logo">♀</div>
          <span className="brand-text">
            Gender<br />Equality Hub
          </span>
        </button>

        <div className="desktop-nav">
          {navItems.map(([id, icon, label]) => navBtn(id, icon, label))}
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenu(true)}>
          ☰
        </button>

        {mobileMenu && (
          <div className="mobile-overlay" onClick={() => setMobileMenu(false)}>
            <aside className="side-nav" onClick={(e) => e.stopPropagation()}>
              <div className="side-header">
                <strong>Menu</strong>
                <button onClick={() => setMobileMenu(false)}>×</button>
              </div>

              <button onClick={() => { go("home"); setMobileMenu(false); }}>
                Home
              </button>

              {navItems.map(([id, , label]) => (
                <button
                  key={id}
                  className={page === id ? "side-active" : ""}
                  onClick={() => {
                    go(id);
                    setMobileMenu(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </aside>
          </div>
        )}
      </nav>


      <div className="page-shell">
        <div className="page-wrap page-content" key={page}>
          {page==="home"&&(
            <div className="home-page">
              <div className="home-hero" style={{padding:"56px 32px",textAlign:"center"}}>
                <p style={{color:DARK,fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:18,fontWeight:600}}>Beijing+30 · UN Women · WEF 2025</p>
                <h1 style={{fontFamily:"Georgia,serif",fontSize:44,fontWeight:400,color:TEXT,margin:"0 0 10px",lineHeight:1.15}}>A World's Eye View of<br/><em>Gender Equality</em></h1>
                <p style={{color:DARK,fontSize:15,maxWidth:500,margin:"14px auto 28px",lineHeight:1.8}}>Knowledge, data, history, and stories illuminating the path toward a world where every person can thrive — <strong>regardless of gender.</strong></p>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                  {[["knowledge","📚 Learn"],["heroines","🌟 Be Inspired"],["map","🌍 Explore"],["projects","🌸 Take Action"]].map(([id,l])=>(
                    <button key={id} onClick={()=>go(id)} style={{background:"rgba(244, 167, 195, 0.62)",border:"1px solid rgba(125, 42, 74, 0.22)",color:DARK,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:500,letterSpacing:"0.04em"}}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{background:LPINK,padding:"32px"}}>
                <div style={{maxWidth:900,margin:"0 auto"}}>
                  <p style={{textAlign:"center",color:MUTED,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:28}}>Key Facts — 2025–2026</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:BORDER}}>
                    {[["$342T","Cumulative economic gain possible by 2050 (UN Women 2025)"],["27.5%","Women in national parliaments globally (IPU 2026)"],["123 yrs","Years to close the global gender gap (WEF 2025)"]].map(([n,l])=>(
                      <div key={n} style={{background:"#fff",padding:"24px",textAlign:"center"}}>
                        <div style={{fontFamily:"Georgia,serif",fontSize:32,color:DARK,marginBottom:6}}>{n}</div>
                        <p style={{fontSize:12,color:MUTED,lineHeight:1.6,margin:0}}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{maxWidth:900,margin:"0 auto",padding:"32px"}}>
                <p style={{textAlign:"center",color:MUTED,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:28}}>Explore the Hub</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {[{id:"knowledge",icon:"📚",title:"Knowledge Hub",desc:"Understand gender inequality — from definitions to global data, culture to media."},{id:"heroines",icon:"🌟",title:"Heroines",desc:"Meet the women who fought for change and the activists shaping our present."},{id:"map",icon:"🌍",title:"World Map",desc:"Explore gender equality data for 80+ countries across all continents."},{id:"projects",icon:"🌸",title:"Funding & Projects",desc:"Discover grants, funding opportunities, and volunteer projects worldwide."}].map(s=>(
                    <div key={s.id} onClick={()=>go(s.id)} style={{border:"1px solid "+BORDER,padding:"22px",cursor:"pointer",background:"#fff",transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)"}}
                      onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 24px rgba(125,42,74,0.12)";}}
                      onMouseLeave={function(e){e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                      <div style={{fontSize:26,marginBottom:10}}>{s.icon}</div>
                      <h3 style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:400,margin:"0 0 6px",color:TEXT}}>{s.title}</h3>
                      <p style={{fontSize:13,color:MUTED,margin:"0 0 14px",lineHeight:1.6}}>{s.desc}</p>
                      <span style={{fontSize:11,color:ACCENT,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:"1px solid "+ACCENT}}>Explore →</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {page!=="home"&&(
            <div className="section-layout">
              <div className="section-side section-side-left" aria-hidden="true" />
              <div className="section-center">
                <div className="page-box">
                  {page==="knowledge"&&<KnowledgePage/>}
                  {page==="examples"&&<ExamplesPage/>}
                  {page==="consequences"&&<ConsequencesPage/>}
                  {page==="heroines"&&<HeroinesPage/>}
                  {page==="projects"&&<ProjectsPage/>}
                  {page==="history"&&<HistoryPage/>}
                  {page==="heard"&&<YouAreHeardPage/>}
                  {page==="checker"&&<CheckerPage/>}
                  {page==="flashcards"&&<FlashcardsPage/>}
                  {page==="map"&&<MapPage/>}
                </div>
              </div>
              <div className="section-side section-side-right" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>


      <footer style={{background:PINK,padding:"28px 40px",textAlign:"center"}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:13,margin:"0 0 6px",color:TEXT}}>Gender Equality Hub</p>
        <p style={{fontSize:11,margin:0,lineHeight:1.7,color:DARK}}>Sources: UN Women Gender Snapshot 2025 · WEF Global Gender Gap Report 2025 · IPU 2026 · LinkedIn Global Talent Trends 2026</p>
      </footer>
    </div>
  );
}
