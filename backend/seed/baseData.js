// =============================================================================
// SAMPLE / ILLUSTRATIVE DATASET — NOT OFFICIAL CUTOFF DATA
// -----------------------------------------------------------------------------
// Every closing rank / score below is a rounded, illustrative placeholder
// meant to demonstrate the prediction engine end-to-end. Before using this
// app for real admission decisions, replace this file with actual JoSAA /
// CSAB / BITSAT / college-specific closing-rank data for the relevant year.
//
// Each row represents ONE college + branch at the General category /
// reference quota. seed/expandCutoffs.js takes this base row and generates
// the full set of category (General/EWS/OBC-NCL/SC/ST) and quota (HS/OS)
// variants using the multipliers in utils/constants.js.
//
// metric: "rank"  -> lower value = better (JEE Main / JEE Advanced)
// metric: "score" -> higher value = better (BITSAT / Other exams)
// =============================================================================

const BASE_ROWS = [

  // ===========================================================================
  // IITs — JEE Advanced, All-India quota only, rank metric
  // ===========================================================================
  { college: "IIT Bombay",    type: "IIT", state: "Maharashtra",    examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 1, metric: "rank", base: 70,   minClassXII: 75 },
  { college: "IIT Bombay",    type: "IIT", state: "Maharashtra",    examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 1, metric: "rank", base: 350,  minClassXII: 75 },
  { college: "IIT Bombay",    type: "IIT", state: "Maharashtra",    examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 1, metric: "rank", base: 1100, minClassXII: 75 },
  { college: "IIT Bombay",    type: "IIT", state: "Maharashtra",    examType: "JEE_ADVANCED", branch: "Chemical Engineering",                     tier: 1, metric: "rank", base: 800,  minClassXII: 75 },
  { college: "IIT Bombay",    type: "IIT", state: "Maharashtra",    examType: "JEE_ADVANCED", branch: "Civil Engineering",                        tier: 1, metric: "rank", base: 1400, minClassXII: 75 },

  { college: "IIT Delhi",     type: "IIT", state: "Delhi",          examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 1, metric: "rank", base: 120,  minClassXII: 75 },
  { college: "IIT Delhi",     type: "IIT", state: "Delhi",          examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 1, metric: "rank", base: 550,  minClassXII: 75 },
  { college: "IIT Delhi",     type: "IIT", state: "Delhi",          examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 1, metric: "rank", base: 1800, minClassXII: 75 },
  { college: "IIT Delhi",     type: "IIT", state: "Delhi",          examType: "JEE_ADVANCED", branch: "Chemical Engineering",                     tier: 1, metric: "rank", base: 1200, minClassXII: 75 },
  { college: "IIT Delhi",     type: "IIT", state: "Delhi",          examType: "JEE_ADVANCED", branch: "Civil Engineering",                        tier: 1, metric: "rank", base: 2200, minClassXII: 75 },

  { college: "IIT Madras",    type: "IIT", state: "Tamil Nadu",     examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 1, metric: "rank", base: 180,  minClassXII: 75 },
  { college: "IIT Madras",    type: "IIT", state: "Tamil Nadu",     examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 1, metric: "rank", base: 700,  minClassXII: 75 },
  { college: "IIT Madras",    type: "IIT", state: "Tamil Nadu",     examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 1, metric: "rank", base: 2100, minClassXII: 75 },
  { college: "IIT Madras",    type: "IIT", state: "Tamil Nadu",     examType: "JEE_ADVANCED", branch: "Chemical Engineering",                     tier: 1, metric: "rank", base: 1500, minClassXII: 75 },

  { college: "IIT Kanpur",    type: "IIT", state: "Uttar Pradesh",  examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 1, metric: "rank", base: 250,  minClassXII: 75 },
  { college: "IIT Kanpur",    type: "IIT", state: "Uttar Pradesh",  examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 1, metric: "rank", base: 900,  minClassXII: 75 },
  { college: "IIT Kanpur",    type: "IIT", state: "Uttar Pradesh",  examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 1, metric: "rank", base: 2600, minClassXII: 75 },
  { college: "IIT Kanpur",    type: "IIT", state: "Uttar Pradesh",  examType: "JEE_ADVANCED", branch: "Chemical Engineering",                     tier: 1, metric: "rank", base: 1700, minClassXII: 75 },

  { college: "IIT Kharagpur", type: "IIT", state: "West Bengal",    examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 400,  minClassXII: 75 },
  { college: "IIT Kharagpur", type: "IIT", state: "West Bengal",    examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 1300, minClassXII: 75 },
  { college: "IIT Kharagpur", type: "IIT", state: "West Bengal",    examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 3200, minClassXII: 75 },
  { college: "IIT Kharagpur", type: "IIT", state: "West Bengal",    examType: "JEE_ADVANCED", branch: "Civil Engineering",                        tier: 2, metric: "rank", base: 4000, minClassXII: 75 },

  { college: "IIT Roorkee",   type: "IIT", state: "Uttarakhand",    examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 650,  minClassXII: 75 },
  { college: "IIT Roorkee",   type: "IIT", state: "Uttarakhand",    examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 1900, minClassXII: 75 },
  { college: "IIT Roorkee",   type: "IIT", state: "Uttarakhand",    examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 4200, minClassXII: 75 },
  { college: "IIT Roorkee",   type: "IIT", state: "Uttarakhand",    examType: "JEE_ADVANCED", branch: "Civil Engineering",                        tier: 2, metric: "rank", base: 5500, minClassXII: 75 },

  { college: "IIT Hyderabad", type: "IIT", state: "Telangana",      examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 750,  minClassXII: 75 },
  { college: "IIT Hyderabad", type: "IIT", state: "Telangana",      examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 2100, minClassXII: 75 },
  { college: "IIT Hyderabad", type: "IIT", state: "Telangana",      examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 4700, minClassXII: 75 },

  { college: "IIT Guwahati",  type: "IIT", state: "Assam",          examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 900,  minClassXII: 75 },
  { college: "IIT Guwahati",  type: "IIT", state: "Assam",          examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 2400, minClassXII: 75 },
  { college: "IIT Guwahati",  type: "IIT", state: "Assam",          examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 5200, minClassXII: 75 },

  { college: "IIT BHU Varanasi", type: "IIT", state: "Uttar Pradesh", examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",         tier: 2, metric: "rank", base: 1200, minClassXII: 75 },
  { college: "IIT BHU Varanasi", type: "IIT", state: "Uttar Pradesh", examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",tier: 2, metric: "rank", base: 3000, minClassXII: 75 },
  { college: "IIT BHU Varanasi", type: "IIT", state: "Uttar Pradesh", examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                 tier: 2, metric: "rank", base: 5800, minClassXII: 75 },

  { college: "IIT Gandhinagar",  type: "IIT", state: "Gujarat",     examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 1800, minClassXII: 75 },
  { college: "IIT Gandhinagar",  type: "IIT", state: "Gujarat",     examType: "JEE_ADVANCED", branch: "Electrical Engineering",                   tier: 3, metric: "rank", base: 3500, minClassXII: 75 },

  { college: "IIT Jodhpur",   type: "IIT", state: "Rajasthan",      examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 2200, minClassXII: 75 },
  { college: "IIT Jodhpur",   type: "IIT", state: "Rajasthan",      examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 4500, minClassXII: 75 },

  { college: "IIT Patna",     type: "IIT", state: "Bihar",          examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 2800, minClassXII: 75 },
  { college: "IIT Patna",     type: "IIT", state: "Bihar",          examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 5500, minClassXII: 75 },

  { college: "IIT Indore",    type: "IIT", state: "Madhya Pradesh", examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 2500, minClassXII: 75 },
  { college: "IIT Indore",    type: "IIT", state: "Madhya Pradesh", examType: "JEE_ADVANCED", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 5000, minClassXII: 75 },

  { college: "IIT Mandi",     type: "IIT", state: "Himachal Pradesh", examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",         tier: 3, metric: "rank", base: 4500, minClassXII: 75 },
  { college: "IIT Tirupati",  type: "IIT", state: "Andhra Pradesh", examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5000, minClassXII: 75 },
  { college: "IIT Dhanbad (ISM)", type: "IIT", state: "Jharkhand",  examType: "JEE_ADVANCED", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 3500, minClassXII: 75 },
  { college: "IIT Dhanbad (ISM)", type: "IIT", state: "Jharkhand",  examType: "JEE_ADVANCED", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 8000, minClassXII: 75 },

  // ===========================================================================
  // NITs — JEE Main, Home-State / Other-State quota applies, rank metric
  // ===========================================================================
  { college: "NIT Trichy",         type: "NIT", state: "Tamil Nadu",     examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 2200,  minClassXII: 75 },
  { college: "NIT Trichy",         type: "NIT", state: "Tamil Nadu",     examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 5200,  minClassXII: 75 },
  { college: "NIT Trichy",         type: "NIT", state: "Tamil Nadu",     examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 12000, minClassXII: 75 },
  { college: "NIT Trichy",         type: "NIT", state: "Tamil Nadu",     examType: "JEE_MAIN", branch: "Civil Engineering",                        tier: 2, metric: "rank", base: 18000, minClassXII: 75 },

  { college: "NIT Surathkal",      type: "NIT", state: "Karnataka",      examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 2600,  minClassXII: 75 },
  { college: "NIT Surathkal",      type: "NIT", state: "Karnataka",      examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 6000,  minClassXII: 75 },
  { college: "NIT Surathkal",      type: "NIT", state: "Karnataka",      examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 13500, minClassXII: 75 },
  { college: "NIT Surathkal",      type: "NIT", state: "Karnataka",      examType: "JEE_MAIN", branch: "Civil Engineering",                        tier: 2, metric: "rank", base: 20000, minClassXII: 75 },

  { college: "NIT Warangal",       type: "NIT", state: "Telangana",      examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 2400,  minClassXII: 75 },
  { college: "NIT Warangal",       type: "NIT", state: "Telangana",      examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 5600,  minClassXII: 75 },
  { college: "NIT Warangal",       type: "NIT", state: "Telangana",      examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 12800, minClassXII: 75 },

  { college: "NIT Rourkela",       type: "NIT", state: "Odisha",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 4200,  minClassXII: 75 },
  { college: "NIT Rourkela",       type: "NIT", state: "Odisha",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 9000,  minClassXII: 75 },
  { college: "NIT Rourkela",       type: "NIT", state: "Odisha",         examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 18000, minClassXII: 75 },
  { college: "NIT Rourkela",       type: "NIT", state: "Odisha",         examType: "JEE_MAIN", branch: "Civil Engineering",                        tier: 3, metric: "rank", base: 24000, minClassXII: 75 },

  { college: "NIT Calicut",        type: "NIT", state: "Kerala",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 4600,  minClassXII: 75 },
  { college: "NIT Calicut",        type: "NIT", state: "Kerala",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 9800,  minClassXII: 75 },
  { college: "NIT Calicut",        type: "NIT", state: "Kerala",         examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 19500, minClassXII: 75 },

  { college: "MNNIT Allahabad",    type: "NIT", state: "Uttar Pradesh",  examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5200,  minClassXII: 75 },
  { college: "MNNIT Allahabad",    type: "NIT", state: "Uttar Pradesh",  examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 11000, minClassXII: 75 },
  { college: "MNNIT Allahabad",    type: "NIT", state: "Uttar Pradesh",  examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 21000, minClassXII: 75 },

  { college: "VNIT Nagpur",        type: "NIT", state: "Maharashtra",    examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5000,  minClassXII: 75 },
  { college: "VNIT Nagpur",        type: "NIT", state: "Maharashtra",    examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 10500, minClassXII: 75 },
  { college: "VNIT Nagpur",        type: "NIT", state: "Maharashtra",    examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 20500, minClassXII: 75 },

  { college: "MANIT Bhopal",       type: "NIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 6200,  minClassXII: 75 },
  { college: "MANIT Bhopal",       type: "NIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 13000, minClassXII: 75 },
  { college: "MANIT Bhopal",       type: "NIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 24000, minClassXII: 75 },

  { college: "MNIT Jaipur",        type: "NIT", state: "Rajasthan",      examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5800,  minClassXII: 75 },
  { college: "MNIT Jaipur",        type: "NIT", state: "Rajasthan",      examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 12200, minClassXII: 75 },
  { college: "MNIT Jaipur",        type: "NIT", state: "Rajasthan",      examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 23000, minClassXII: 75 },

  { college: "NIT Durgapur",       type: "NIT", state: "West Bengal",    examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 8500,  minClassXII: 75 },
  { college: "NIT Durgapur",       type: "NIT", state: "West Bengal",    examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 16000, minClassXII: 75 },
  { college: "NIT Durgapur",       type: "NIT", state: "West Bengal",    examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 4, metric: "rank", base: 28000, minClassXII: 75 },

  { college: "NIT Kurukshetra",    type: "NIT", state: "Haryana",        examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 7000,  minClassXII: 75 },
  { college: "NIT Kurukshetra",    type: "NIT", state: "Haryana",        examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 14500, minClassXII: 75 },
  { college: "NIT Kurukshetra",    type: "NIT", state: "Haryana",        examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 26000, minClassXII: 75 },
  { college: "NIT Kurukshetra",    type: "NIT", state: "Haryana",        examType: "JEE_MAIN", branch: "Civil Engineering",                        tier: 3, metric: "rank", base: 32000, minClassXII: 75 },

  { college: "NIT Jalandhar",      type: "NIT", state: "Punjab",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 7800,  minClassXII: 75 },
  { college: "NIT Jalandhar",      type: "NIT", state: "Punjab",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 16000, minClassXII: 75 },
  { college: "NIT Jalandhar",      type: "NIT", state: "Punjab",         examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 28000, minClassXII: 75 },

  { college: "NIT Hamirpur",       type: "NIT", state: "Himachal Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",         tier: 4, metric: "rank", base: 10000, minClassXII: 75 },
  { college: "NIT Hamirpur",       type: "NIT", state: "Himachal Pradesh", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",tier: 4, metric: "rank", base: 20000, minClassXII: 75 },

  { college: "NIT Silchar",        type: "NIT", state: "Assam",          examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 11000, minClassXII: 75 },
  { college: "NIT Silchar",        type: "NIT", state: "Assam",          examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 22000, minClassXII: 75 },

  { college: "NIT Patna",          type: "NIT", state: "Bihar",          examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 12000, minClassXII: 75 },
  { college: "NIT Patna",          type: "NIT", state: "Bihar",          examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 24000, minClassXII: 75 },

  { college: "NIT Agartala",       type: "NIT", state: "Tripura",        examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 18000, minClassXII: 75 },
  { college: "NIT Agartala",       type: "NIT", state: "Tripura",        examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 35000, minClassXII: 75 },

  { college: "NIT Srinagar",       type: "NIT", state: "Jammu & Kashmir", examType: "JEE_MAIN", branch: "Computer Science & Engineering",          tier: 4, metric: "rank", base: 20000, minClassXII: 75 },
  { college: "NIT Srinagar",       type: "NIT", state: "Jammu & Kashmir", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering", tier: 4, metric: "rank", base: 38000, minClassXII: 75 },

  // ===========================================================================
  // IIITs (PPP model) — JEE Main, All-India quota only, rank metric
  // ===========================================================================
  { college: "IIIT Hyderabad",     type: "IIIT", state: "Telangana",     examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 3500,  minClassXII: 75 },
  { college: "IIIT Hyderabad",     type: "IIIT", state: "Telangana",     examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 7000,  minClassXII: 75 },

  { college: "IIIT Delhi",         type: "IIIT", state: "Delhi",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 4500,  minClassXII: 75 },
  { college: "IIIT Delhi",         type: "IIIT", state: "Delhi",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 9000,  minClassXII: 75 },

  { college: "IIIT Bangalore",     type: "IIIT", state: "Karnataka",     examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5500,  minClassXII: 75 },
  { college: "IIIT Bangalore",     type: "IIIT", state: "Karnataka",     examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 11000, minClassXII: 75 },

  { college: "IIIT Allahabad",     type: "IIIT", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 6800,  minClassXII: 75 },
  { college: "IIIT Allahabad",     type: "IIIT", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 14500, minClassXII: 75 },

  { college: "IIIT Pune",          type: "IIIT", state: "Maharashtra",   examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 8000,  minClassXII: 75 },
  { college: "IIIT Lucknow",       type: "IIIT", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 8500,  minClassXII: 75 },
  { college: "IIIT Sri City",      type: "IIIT", state: "Andhra Pradesh",examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 9000,  minClassXII: 75 },
  { college: "IIIT Vadodara",      type: "IIIT", state: "Gujarat",       examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 10000, minClassXII: 75 },
  { college: "IIIT Naya Raipur",   type: "IIIT", state: "Chhattisgarh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 11000, minClassXII: 75 },

  { college: "IIIT Gwalior",       type: "IIIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",          tier: 4, metric: "rank", base: 9500,  minClassXII: 75 },
  { college: "IIIT Gwalior",       type: "IIIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering", tier: 4, metric: "rank", base: 19000, minClassXII: 75 },

  { college: "IIIT Jabalpur",      type: "IIIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",          tier: 4, metric: "rank", base: 11000, minClassXII: 75 },
  { college: "IIIT Jabalpur",      type: "IIIT", state: "Madhya Pradesh", examType: "JEE_MAIN", branch: "Electronics & Communication Engineering", tier: 4, metric: "rank", base: 21500, minClassXII: 75 },

  { college: "IIIT Kancheepuram",  type: "IIIT", state: "Tamil Nadu",    examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 9800,  minClassXII: 75 },

  // ===========================================================================
  // GFTIs — JEE Main, All-India quota only, rank metric
  // ===========================================================================
  { college: "DTU Delhi",          type: "GFTI", state: "Delhi",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 2, metric: "rank", base: 3800,  minClassXII: 75 },
  { college: "DTU Delhi",          type: "GFTI", state: "Delhi",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 2, metric: "rank", base: 7500,  minClassXII: 75 },
  { college: "DTU Delhi",          type: "GFTI", state: "Delhi",         examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 2, metric: "rank", base: 16000, minClassXII: 75 },

  { college: "NSUT Delhi",         type: "GFTI", state: "Delhi",         examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 5500,  minClassXII: 75 },
  { college: "NSUT Delhi",         type: "GFTI", state: "Delhi",         examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 11000, minClassXII: 75 },

  { college: "COEP Pune",          type: "GFTI", state: "Maharashtra",   examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 6000,  minClassXII: 75 },
  { college: "COEP Pune",          type: "GFTI", state: "Maharashtra",   examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 12000, minClassXII: 75 },
  { college: "COEP Pune",          type: "GFTI", state: "Maharashtra",   examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 22000, minClassXII: 75 },

  { college: "RGIPT Rae Bareli",   type: "GFTI", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 8000,  minClassXII: 75 },
  { college: "RGIPT Rae Bareli",   type: "GFTI", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Chemical Engineering",                     tier: 3, metric: "rank", base: 14000, minClassXII: 75 },
  { college: "RGIPT Rae Bareli",   type: "GFTI", state: "Uttar Pradesh", examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 20000, minClassXII: 75 },

  { college: "BIT Mesra",          type: "GFTI", state: "Jharkhand",     examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 8200,  minClassXII: 75 },
  { college: "BIT Mesra",          type: "GFTI", state: "Jharkhand",     examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 17000, minClassXII: 75 },

  { college: "IIEST Shibpur",      type: "GFTI", state: "West Bengal",   examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 7600,  minClassXII: 75 },
  { college: "IIEST Shibpur",      type: "GFTI", state: "West Bengal",   examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 15800, minClassXII: 75 },

  { college: "PEC Chandigarh",     type: "GFTI", state: "Punjab",        examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 7000,  minClassXII: 75 },
  { college: "PEC Chandigarh",     type: "GFTI", state: "Punjab",        examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 4, metric: "rank", base: 14800, minClassXII: 75 },

  { college: "Assam University Silchar", type: "GFTI", state: "Assam",   examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 4, metric: "rank", base: 25000, minClassXII: 75 },

  // ===========================================================================
  // Private colleges using JEE Main PERCENTILE (own admissions — no JoSAA/HS-OS split)
  // metric: "score", higher = better (NTA percentile, 0–100)
  // ===========================================================================
  { college: "LNMIIT Jaipur",      type: "Private", state: "Rajasthan",  examType: "JEE_MAIN_PERCENTILE", branch: "Computer Science & Engineering",           tier: 3, metric: "score", base: 97.0, minClassXII: 60 },
  { college: "LNMIIT Jaipur",      type: "Private", state: "Rajasthan",  examType: "JEE_MAIN_PERCENTILE", branch: "Information Technology",                   tier: 3, metric: "score", base: 95.0, minClassXII: 60 },
  { college: "LNMIIT Jaipur",      type: "Private", state: "Rajasthan",  examType: "JEE_MAIN_PERCENTILE", branch: "Electronics & Communication Engineering",  tier: 3, metric: "score", base: 93.0, minClassXII: 60 },
  { college: "LNMIIT Jaipur",      type: "Private", state: "Rajasthan",  examType: "JEE_MAIN_PERCENTILE", branch: "Mechanical Engineering",                   tier: 3, metric: "score", base: 87.0, minClassXII: 60 },

  { college: "Thapar University",  type: "Private", state: "Punjab",     examType: "JEE_MAIN", branch: "Computer Science & Engineering",           tier: 3, metric: "rank", base: 20000, minClassXII: 60 },
  { college: "Thapar University",  type: "Private", state: "Punjab",     examType: "JEE_MAIN", branch: "Electronics & Communication Engineering",  tier: 3, metric: "rank", base: 38000, minClassXII: 60 },
  { college: "Thapar University",  type: "Private", state: "Punjab",     examType: "JEE_MAIN", branch: "Mechanical Engineering",                   tier: 3, metric: "rank", base: 55000, minClassXII: 60 },

  // ===========================================================================
  // BITS — BITSAT, category-agnostic, score metric (out of 390)
  // ===========================================================================
  { college: "BITS Pilani",        type: "BITS", state: "Rajasthan",     examType: "BITSAT", branch: "Computer Science & Engineering",             tier: 1, metric: "score", base: 327, minClassXII: 75 },
  { college: "BITS Pilani",        type: "BITS", state: "Rajasthan",     examType: "BITSAT", branch: "Electronics & Communication Engineering",    tier: 1, metric: "score", base: 295, minClassXII: 75 },
  { college: "BITS Pilani",        type: "BITS", state: "Rajasthan",     examType: "BITSAT", branch: "Mechanical Engineering",                     tier: 1, metric: "score", base: 265, minClassXII: 75 },
  { college: "BITS Pilani",        type: "BITS", state: "Rajasthan",     examType: "BITSAT", branch: "Chemical Engineering",                       tier: 1, metric: "score", base: 258, minClassXII: 75 },

  { college: "BITS Goa",           type: "BITS", state: "Goa",           examType: "BITSAT", branch: "Computer Science & Engineering",             tier: 2, metric: "score", base: 310, minClassXII: 75 },
  { college: "BITS Goa",           type: "BITS", state: "Goa",           examType: "BITSAT", branch: "Electronics & Communication Engineering",    tier: 2, metric: "score", base: 280, minClassXII: 75 },
  { college: "BITS Goa",           type: "BITS", state: "Goa",           examType: "BITSAT", branch: "Mechanical Engineering",                     tier: 2, metric: "score", base: 250, minClassXII: 75 },

  { college: "BITS Hyderabad",     type: "BITS", state: "Telangana",     examType: "BITSAT", branch: "Computer Science & Engineering",             tier: 2, metric: "score", base: 305, minClassXII: 75 },
  { college: "BITS Hyderabad",     type: "BITS", state: "Telangana",     examType: "BITSAT", branch: "Electronics & Communication Engineering",    tier: 2, metric: "score", base: 275, minClassXII: 75 },
  { college: "BITS Hyderabad",     type: "BITS", state: "Telangana",     examType: "BITSAT", branch: "Mechanical Engineering",                     tier: 2, metric: "score", base: 245, minClassXII: 75 },

  // ===========================================================================
  // VITEEE — VIT campuses, category-agnostic, score metric (out of 125)
  // ===========================================================================
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Computer Science & Engineering",            tier: 3, metric: "score", base: 100, minClassXII: 60 },
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Electronics & Communication Engineering",   tier: 3, metric: "score", base: 85,  minClassXII: 60 },
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Mechanical Engineering",                    tier: 3, metric: "score", base: 70,  minClassXII: 60 },
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Electrical Engineering",                    tier: 3, metric: "score", base: 72,  minClassXII: 60 },
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Civil Engineering",                         tier: 3, metric: "score", base: 60,  minClassXII: 60 },
  { college: "VIT Vellore",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Data Science & Artificial Intelligence",    tier: 3, metric: "score", base: 108, minClassXII: 60 },

  { college: "VIT Chennai",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Computer Science & Engineering",            tier: 3, metric: "score", base: 95,  minClassXII: 60 },
  { college: "VIT Chennai",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Electronics & Communication Engineering",   tier: 3, metric: "score", base: 80,  minClassXII: 60 },
  { college: "VIT Chennai",        type: "Private", state: "Tamil Nadu",  examType: "VITEEE", branch: "Data Science & Artificial Intelligence",    tier: 3, metric: "score", base: 102, minClassXII: 60 },

  { college: "VIT Bhopal",         type: "Private", state: "Madhya Pradesh", examType: "VITEEE", branch: "Computer Science & Engineering",         tier: 4, metric: "score", base: 75,  minClassXII: 60 },
  { college: "VIT Bhopal",         type: "Private", state: "Madhya Pradesh", examType: "VITEEE", branch: "Electronics & Communication Engineering",tier: 4, metric: "score", base: 60,  minClassXII: 60 },

  { college: "VIT-AP",             type: "Private", state: "Andhra Pradesh", examType: "VITEEE", branch: "Computer Science & Engineering",          tier: 4, metric: "score", base: 78,  minClassXII: 60 },
  { college: "VIT-AP",             type: "Private", state: "Andhra Pradesh", examType: "VITEEE", branch: "Electronics & Communication Engineering", tier: 4, metric: "score", base: 62,  minClassXII: 60 },

  // ===========================================================================
  // SRMJEEE — SRM campuses, category-agnostic, score metric (0–100 normalised)
  // ===========================================================================
  { college: "SRM KTR (Chennai)",  type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Computer Science & Engineering",           tier: 3, metric: "score", base: 80,  minClassXII: 60 },
  { college: "SRM KTR (Chennai)",  type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Electronics & Communication Engineering",  tier: 3, metric: "score", base: 68,  minClassXII: 60 },
  { college: "SRM KTR (Chennai)",  type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Mechanical Engineering",                   tier: 3, metric: "score", base: 55,  minClassXII: 60 },
  { college: "SRM KTR (Chennai)",  type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Biotechnology",                            tier: 3, metric: "score", base: 60,  minClassXII: 60 },

  { college: "SRM Ramapuram",      type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Computer Science & Engineering",           tier: 4, metric: "score", base: 72,  minClassXII: 60 },
  { college: "SRM Ramapuram",      type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Electronics & Communication Engineering",  tier: 4, metric: "score", base: 58,  minClassXII: 60 },

  { college: "SRM Vadapalani",     type: "Private", state: "Tamil Nadu",  examType: "SRMJEEE", branch: "Computer Science & Engineering",           tier: 4, metric: "score", base: 68,  minClassXII: 60 },

  // ===========================================================================
  // COMEDK UGET — Karnataka private colleges, score metric (out of 180)
  // ===========================================================================
  { college: "RV College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Computer Science & Engineering",      tier: 3, metric: "score", base: 160, minClassXII: 60 },
  { college: "RV College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 145, minClassXII: 60 },
  { college: "RV College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Mechanical Engineering",               tier: 3, metric: "score", base: 128, minClassXII: 60 },
  { college: "RV College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Civil Engineering",                    tier: 3, metric: "score", base: 112, minClassXII: 60 },

  { college: "MS Ramaiah Institute of Technology", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Computer Science & Engineering", tier: 3, metric: "score", base: 155, minClassXII: 60 },
  { college: "MS Ramaiah Institute of Technology", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 140, minClassXII: 60 },
  { college: "MS Ramaiah Institute of Technology", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Mechanical Engineering",       tier: 3, metric: "score", base: 120, minClassXII: 60 },

  { college: "BMS College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Computer Science & Engineering",      tier: 3, metric: "score", base: 150, minClassXII: 60 },
  { college: "BMS College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 135, minClassXII: 60 },
  { college: "BMS College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Mechanical Engineering",               tier: 3, metric: "score", base: 115, minClassXII: 60 },

  { college: "PES University",     type: "Private", state: "Karnataka",   examType: "COMEDK", branch: "Computer Science & Engineering",             tier: 3, metric: "score", base: 148, minClassXII: 60 },
  { college: "PES University",     type: "Private", state: "Karnataka",   examType: "COMEDK", branch: "Electronics & Communication Engineering",    tier: 3, metric: "score", base: 132, minClassXII: 60 },

  { college: "Dayananda Sagar College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Computer Science & Engineering", tier: 4, metric: "score", base: 130, minClassXII: 60 },
  { college: "Dayananda Sagar College of Engineering", type: "Private", state: "Karnataka", examType: "COMEDK", branch: "Electronics & Communication Engineering", tier: 4, metric: "score", base: 110, minClassXII: 60 },

  // ===========================================================================
  // MET (Manipal Entrance Test) — Manipal campuses, score metric (0–100 normalised)
  // ===========================================================================
  { college: "Manipal Institute of Technology", type: "Private", state: "Karnataka", examType: "MET", branch: "Computer Science & Engineering",   tier: 3, metric: "score", base: 80,  minClassXII: 60 },
  { college: "Manipal Institute of Technology", type: "Private", state: "Karnataka", examType: "MET", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 68, minClassXII: 60 },
  { college: "Manipal Institute of Technology", type: "Private", state: "Karnataka", examType: "MET", branch: "Mechanical Engineering",             tier: 3, metric: "score", base: 55,  minClassXII: 60 },
  { college: "Manipal Institute of Technology", type: "Private", state: "Karnataka", examType: "MET", branch: "Information Technology",             tier: 3, metric: "score", base: 75,  minClassXII: 60 },
  { college: "Manipal Institute of Technology", type: "Private", state: "Karnataka", examType: "MET", branch: "Biotechnology",                      tier: 3, metric: "score", base: 58,  minClassXII: 60 },

  { college: "MIT Jaipur (Manipal)", type: "Private", state: "Rajasthan", examType: "MET", branch: "Computer Science & Engineering",               tier: 4, metric: "score", base: 65,  minClassXII: 60 },
  { college: "MIT Jaipur (Manipal)", type: "Private", state: "Rajasthan", examType: "MET", branch: "Electronics & Communication Engineering",      tier: 4, metric: "score", base: 52,  minClassXII: 60 },

  { college: "MIT Bengaluru (Manipal)", type: "Private", state: "Karnataka", examType: "MET", branch: "Computer Science & Engineering",            tier: 4, metric: "score", base: 68,  minClassXII: 60 },
  { college: "MIT Bengaluru (Manipal)", type: "Private", state: "Karnataka", examType: "MET", branch: "Electronics & Communication Engineering",   tier: 4, metric: "score", base: 55,  minClassXII: 60 },

  // ===========================================================================
  // KCET — Karnataka state CET, score metric (out of 180, PCM marks)
  // ===========================================================================
  { college: "NIE Mysore",         type: "Private", state: "Karnataka",   examType: "KCET", branch: "Computer Science & Engineering",              tier: 3, metric: "score", base: 155, minClassXII: 60 },
  { college: "NIE Mysore",         type: "Private", state: "Karnataka",   examType: "KCET", branch: "Electronics & Communication Engineering",     tier: 3, metric: "score", base: 140, minClassXII: 60 },
  { college: "NIE Mysore",         type: "Private", state: "Karnataka",   examType: "KCET", branch: "Mechanical Engineering",                      tier: 3, metric: "score", base: 120, minClassXII: 60 },

  { college: "DSCE Bangalore",     type: "Private", state: "Karnataka",   examType: "KCET", branch: "Computer Science & Engineering",              tier: 4, metric: "score", base: 140, minClassXII: 60 },
  { college: "DSCE Bangalore",     type: "Private", state: "Karnataka",   examType: "KCET", branch: "Electronics & Communication Engineering",     tier: 4, metric: "score", base: 120, minClassXII: 60 },

  { college: "JSS Science & Technology University", type: "Private", state: "Karnataka", examType: "KCET", branch: "Computer Science & Engineering", tier: 3, metric: "score", base: 160, minClassXII: 60 },
  { college: "JSS Science & Technology University", type: "Private", state: "Karnataka", examType: "KCET", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 145, minClassXII: 60 },

  // ===========================================================================
  // UPSEE / AKTU CET — Uttar Pradesh state exam, score metric (out of 600)
  // ===========================================================================
  { college: "Harcourt Butler Technical University", type: "State", state: "Uttar Pradesh", examType: "UPSEE", branch: "Computer Science & Engineering",  tier: 3, metric: "score", base: 450, minClassXII: 60 },
  { college: "Harcourt Butler Technical University", type: "State", state: "Uttar Pradesh", examType: "UPSEE", branch: "Electronics & Communication Engineering", tier: 3, metric: "score", base: 390, minClassXII: 60 },
  { college: "Harcourt Butler Technical University", type: "State", state: "Uttar Pradesh", examType: "UPSEE", branch: "Mechanical Engineering",          tier: 3, metric: "score", base: 330, minClassXII: 60 },

  { college: "KIET Group of Institutions", type: "Private", state: "Uttar Pradesh", examType: "UPSEE", branch: "Computer Science & Engineering",          tier: 4, metric: "score", base: 380, minClassXII: 60 },
  { college: "KIET Group of Institutions", type: "Private", state: "Uttar Pradesh", examType: "UPSEE", branch: "Electronics & Communication Engineering",  tier: 4, metric: "score", base: 320, minClassXII: 60 },
  { college: "KIET Group of Institutions", type: "Private", state: "Uttar Pradesh", examType: "UPSEE", branch: "Mechanical Engineering",                   tier: 4, metric: "score", base: 270, minClassXII: 60 },

  { college: "Ajay Kumar Garg Engineering College", type: "Private", state: "Uttar Pradesh", examType: "UPSEE", branch: "Computer Science & Engineering", tier: 4, metric: "score", base: 340, minClassXII: 60 },
  { college: "Ajay Kumar Garg Engineering College", type: "Private", state: "Uttar Pradesh", examType: "UPSEE", branch: "Electronics & Communication Engineering", tier: 4, metric: "score", base: 285, minClassXII: 60 },

  // ===========================================================================
  // REAP — Rajasthan Engineering Admission Process, score metric (out of 120)
  // ===========================================================================
  { college: "SKIT Jaipur",        type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Computer Science & Engineering",              tier: 4, metric: "score", base: 95,  minClassXII: 60 },
  { college: "SKIT Jaipur",        type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Electronics & Communication Engineering",     tier: 4, metric: "score", base: 80,  minClassXII: 60 },
  { college: "SKIT Jaipur",        type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Mechanical Engineering",                      tier: 4, metric: "score", base: 65,  minClassXII: 60 },
  { college: "SKIT Jaipur",        type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Information Technology",                      tier: 4, metric: "score", base: 90,  minClassXII: 60 },
  { college: "SKIT Jaipur",        type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Civil Engineering",                           tier: 4, metric: "score", base: 55,  minClassXII: 60 },

  { college: "JECRC University",   type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Computer Science & Engineering",              tier: 4, metric: "score", base: 92,  minClassXII: 60 },
  { college: "JECRC University",   type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Electronics & Communication Engineering",     tier: 4, metric: "score", base: 76,  minClassXII: 60 },
  { college: "JECRC University",   type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Mechanical Engineering",                      tier: 4, metric: "score", base: 62,  minClassXII: 60 },
  { college: "JECRC University",   type: "Private", state: "Rajasthan",   examType: "REAP", branch: "Data Science & Artificial Intelligence",      tier: 4, metric: "score", base: 96,  minClassXII: 60 },

  { college: "Poornima College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Computer Science & Engineering",  tier: 4, metric: "score", base: 85,  minClassXII: 60 },
  { college: "Poornima College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Electronics & Communication Engineering", tier: 4, metric: "score", base: 70, minClassXII: 60 },
  { college: "Poornima College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Information Technology",           tier: 4, metric: "score", base: 82,  minClassXII: 60 },

  { college: "Arya College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Computer Science & Engineering",      tier: 4, metric: "score", base: 78,  minClassXII: 60 },
  { college: "Arya College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Electronics & Communication Engineering", tier: 4, metric: "score", base: 64, minClassXII: 60 },
  { college: "Arya College of Engineering", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Mechanical Engineering",               tier: 4, metric: "score", base: 52,  minClassXII: 60 },

  { college: "Jagan Nath University Jaipur", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Computer Science & Engineering",     tier: 4, metric: "score", base: 70,  minClassXII: 60 },
  { college: "Global Institute of Technology", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Computer Science & Engineering",   tier: 4, metric: "score", base: 68,  minClassXII: 60 },
  { college: "Vivekananda Global University", type: "Private", state: "Rajasthan", examType: "REAP", branch: "Computer Science & Engineering",    tier: 4, metric: "score", base: 72,  minClassXII: 60 },

];

module.exports = BASE_ROWS;
