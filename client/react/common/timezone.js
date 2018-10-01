export const timezones = [
    {abbr: "BRT", value: "E. South America Standard Time", text: "(UTC-03:00) Brasilia"},
    {abbr: "GFT", value: "SA Eastern Standard Time", text: "(UTC-03:00) Buenos Aires, Georgetown"},
    {abbr: "WGT", value: "Greenland Standard Time", text: "(UTC-03:00) Greenland"},
    {abbr: "UYT", value: "Montevideo Standard Time", text: "(UTC-03:00) Montevideo"},
    {abbr: "NST", value: "Newfoundland Standard Time", text: "(UTC-03:30) Newfoundland"},
    {abbr: "AST", value: "Atlantic Standard Time", text: "(UTC-04:00) Atlantic Time (Canada)"},
    {abbr: "BOT", value: "SA Western Standard Time", text: "(UTC-04:00) La Paz"},
    {abbr: "AMT", value: "Central Brazilian Standard Time", text: "(UTC-04:00) Manaus"},
    {abbr: "CLT", value: "Pacific SA Standard Time", text: "(UTC-04:00) Santiago"},
    {abbr: "VET", value: "Venezuela Standard Time", text: "(UTC-04:30) Caracas"},
    {abbr: "COT", value: "SA Pacific Standard Time", text: "(UTC-05:00) Bogota, Lima, Quito, Rio Branco"},
    {abbr: "EST", value: "Eastern Standard Time", text: "(UTC-05:00) Eastern Time (US and Canada)"},
    {abbr: "EST", value: "US Eastern Standard Time", text: "(UTC-05:00) Indiana (East)"},
    {abbr: "CST", value: "Central America Standard Time", text: "(UTC-06:00) Central America"},
    {abbr: "CST", value: "Central Standard Time", text: "(UTC-06:00) Central Time (US and Canada)"},
    {abbr: "CST", value: "Central Standard Time (Mexico)", text: "(UTC-06:00) Guadalajara, Mexico City, Monterrey"},
    {abbr: "CST", value: "Canada Central Standard Time", text: "(UTC-06:00) Saskatchewan"},
    {abbr: "MST", value: "US Mountain Standard Time", text: "(UTC-07:00) Arizona"},
    {abbr: "MST", value: "Mountain Standard Time (Mexico)", text: "(UTC-07:00) Chihuahua, La Paz, Mazatlan"},
    {abbr: "MST", value: "Mountain Standard Time", text: "(UTC-07:00) Mountain Time (US and Canada)"},
    {abbr: "PST", value: "Pacific Standard Time", text: "(UTC-08:00) Pacific Time (US and Canada)"},
    {abbr: "PST", value: "Pacific Standard Time (Mexico)", text: "(UTC-08:00) Tijuana, Baja California"},
    {abbr: "AKST", value: "Alaskan Standard Time", text: "(UTC-09:00) Alaska"},
    {abbr: "HAST", value: "Hawaiian Standard Time", text: "(UTC-10:00) Hawaii"},
    {abbr: "SST", value: "Samoa Standard Time", text: "(UTC-11:00) Midway Island, Samoa"},
    {abbr: "GMT+12", value: "Dateline Standard Time", text: "(UTC-12:00) International Date Line West"},
    {abbr: "GMT", value: "GMT Standard Time", text: "(UTC+00:00) Dublin, Edinburgh, Lisbon, London"},
];

export const mapAbbr = (value = "GMT Standard Time") => {
    if (value === "UTC") return "UTC";
    return timezones.find(t => t.value === value).abbr;
};

