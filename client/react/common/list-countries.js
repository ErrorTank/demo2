export const countries = [
    {
        country: { value: 1, abbreviation: "US", name: "United States of America", text: { state: "State", zip: "Zip Code" }, validation: { zip: /^\d{5}$/ } },
        states: [{ value: "AL", name: "Alabama" }, { value: "AK", name: "Alaska" }, { value: "AZ", name: "Arizona" }, { value: "AR", name: "Arkansas" }, { value: "CA", name: "California" }, { value: "CO", name: "Colorado" }, { value: "CT", name: "Connecticut" }, { value: "DE", name: "Delaware" }, { value: "FL", name: "Florida" }, { value: "GA", name: "Georgia" }, { value: "HI", name: "Hawaii" }, { value: "ID", name: "Idaho" }, { value: "IL", name: "Illinois" }, { value: "IN", name: "Indiana" }, { value: "IA", name: "Iowa" }, { value: "KS", name: "Kansas" }, { value: "KY", name: "Kentucky" }, { value: "LA", name: "Louisiana" }, { value: "ME", name: "Maine" }, { value: "MD", name: "Maryland" }, { value: "MA", name: "Massachusetts" }, { value: "MI", name: "Michigan" }, { value: "MN", name: "Minnesota" }, { value: "MS", name: "Mississippi" }, { value: "MO", name: "Missouri" }, { value: "MT", name: "Montana" }, { value: "NE", name: "Nebraska" }, { value: "NV", name: "Nevada" }, { value: "NH", name: "New Hampshire" }, { value: "NJ", name: "New Jersey" }, { value: "NM", name: "New Mexico" }, { value: "NY", name: "New York" }, { value: "NC", name: "North Carolina" }, { value: "ND", name: "North Dakota" }, { value: "OH", name: "Ohio" }, { value: "OK", name: "Oklahoma" }, { value: "OR", name: "Oregon" }, { value: "PA", name: "Pennsylvania" }, { value: "PR", name: "Puerto Rico" }, { value: "RI", name: "Rhode Island" }, { value: "SC", name: "South Carolina" }, { value: "SD", name: "South Dakota" }, { value: "TN", name: "Tennessee" }, { value: "TX", name: "Texas" }, { value: "UT", name: "Utah" }, { value: "VT", name: "Vermont" }, { value: "VA", name: "Virginia" }, { value: "WA", name: "Washington" }, { value: "DC", name: "Washington D.C." }, { value: "WV", name: "West Virginia" }, { value: "WI", name: "Wisconsin" }, { value: "WY", name: "Wyoming" }]
    },
    {
        country: { value: 2, abbreviation: "CA", name: "Canada", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]( )?[0-9][A-Z][0-9]$/i } },
        states: [{ value: "AB", name: "Alberta" }, { value: "BC", name: "British Columbia" }, { value: "MB", name: "Manitoba" }, { value: "NB", name: "New Brunswick" }, { value: "NL", name: "Newfoundland " }, { value: "NT", name: "Northwest Territories" }, { value: "NS", name: "Nova Scotia " }, { value: "NU", name: "Nunavut" }, { value: "ON", name: "Ontario " }, { value: "PE", name: "Prince Edward Island " }, { value: "QC", name: "Quebec " }, { value: "SK", name: "Saskatchewan " }, { value: "YT", name: "Yukon Territories" }]
    },
    {
        country: { value: 3, abbreviation: "BE", name: "Belgium", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A(1[0-9][0-9][0-9]|2[0-9][0-9][0-9]|3[0-9][0-9][0-9]|4[0-9][0-9][0-9]|5[0-6][0-9][0-9]|6[0-9][0-9][0-9]|7[0-9][0-9][0-9]|8[0-9][0-9][0-9]|9[0-9][0-9][0-9]|)\Z/ } },
        states: []
    },
    {
        country: { value: 4, abbreviation: "GR", name: "Greece", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A\Z/ } },
        states: []
    },
    {
        country: { value: 5, abbreviation: "LT", name: "Lithuania", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A\d{5,5}\Z/ } },
        states: []
    },
    {
        country: { value: 6, abbreviation: "PT", name: "Portugal", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A([1-9]\d{3,3}(-)\d{3,3})\Z/ } },
        states: []
    },
    {
        country: { value: 7, abbreviation: "BG", name: "Bulgaria", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A[1-9]\d{3,3}\Z/ } },
        states: []
    },
    {
        country: { value: 8, abbreviation: "ES", name: "Spain", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/ } },
        states: []
    },
    {
        country: { value: 9, abbreviation: "LU", name: "Luxembourg", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A((1|2|4|9)[0-9][0-9][0-9]|(3)[2-9][0-9][0-9]|(5)[2-9][0-9][0-9]|(6)[1-9][0-9][0-9]|(7)[2-7][0-9][0-9]|(8)[0-8][0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 10, abbreviation: "RO", name: "Romania", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A([0-9][0-8]\d{4,4})\Z/ } },
        states: []
    },
    {
        country: { value: 11, abbreviation: "CZ", name: "Czech Republic", text: { state: "District", zip: "Postal Code" }, validation: { zip: /\A([1,3,6,7][0-9][0-9]( )[0-9][0-9]|[2][2,5-9][0-9]( )[0-9][0-9]|[4][0-1,3-4,6-7][0-9]( )[0-9][0-9]|[5][0-1,3-9][0-9]( )[0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 12, abbreviation: "FR", name: "France", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/ } },
        states: []
    },
    {
        country: { value: 13, abbreviation: "HU", name: "Hungary", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A[1-9]\d{3,3}\Z/ } },
        states: []
    },
    {
        country: { value: 14, abbreviation: "SI", name: "Slovenia", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A[1-9]\d{3,3}\Z/ } },
        states: []
    },
    {
        country: { value: 15, abbreviation: "DK", name: "Denmark", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^([D-d][K-k])?( |-)?[1-9]{1}[0-9]{3}$/ } },
        states: []
    },
    {
        country: { value: 16, abbreviation: "HR", name: "Croatia", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A([1-5][0-9][0-9][0-9][0-9]|[1-5][0-9]( )[0-9][0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 17, abbreviation: "MT", name: "Malta", text: { state: "District", zip: "Postal Code" }, validation: { zip: /\A([A-Z]{3,3}( )\d{4,4})\Z/ } },
        states: []
    },
    {
        country: { value: 18, abbreviation: "SK", name: "Slovakia", text: { state: "District", zip: "Postal Code" }, validation: { zip: /\A((0|8|9)\d{2,2}( )\d{2,2})\Z/ } },
        states: []
    },
    {
        country: { value: 19, abbreviation: "DE", name: "Germany", text: { state: "State", zip: "Postal Code" }, validation: { zip: /\A((0)[1-4|6-9]\d{3,3}|(4)[0-2|4-9]\d{3,3}|(6)[0-1|3-9]\d{3,3}|[1-3|5|7-9]\d{4,4})\Z/ } },
        states: []
    },
    {
        country: { value: 20, abbreviation: "IT", name: "Italy", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^[0-9]{5}$/ } },
        states: []
    },
    {
        country: { value: 21, abbreviation: "NL", name: "Netherlands", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/ } },
        states: []
    },
    {
        country: { value: 22, abbreviation: "FI", name: "Finland", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A\d{5,5}\Z/ } },
        states: []
    },
    {
        country: { value: 23, abbreviation: "EE", name: "Estonia", text: { state: "County", zip: "Postal Code" }, validation: { zip: /\A([1-9][0-9][0-9][0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 24, abbreviation: "CY", name: "Cyprus", text: { state: "District", zip: "Postal Code" }, validation: { zip: /\A([1-9][0-9][0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 25, abbreviation: "AT", name: "Austria", text: { state: "State", zip: "Postal Code" }, validation: { zip: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/ } },
        states: []
    },
    {
        country: { value: 26, abbreviation: "SE", name: "Sweden", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/ } },
        states: []
    },
    {
        country: { value: 27, abbreviation: "IE", name: "Ireland", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A([A|C-F|H|K|N|P|R|T-Z][0-9][0-9|W]( )[A|C-F|H|K|N|P|R|T-Z][A|C-F|H|K|N|P|R|T-Z|0-9][A|C-F|H|K|N|P|R|T-Z|0-9][A|C-F|H|K|N|P|R|T-Z|0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 28, abbreviation: "LV", name: "Latvia", text: { state: "District", zip: "Postal Code" }, validation: { zip: /\A((1)[0-9][0-9][0-9]|(2)[0-1][0-9][0-9]|(3)[0-4][0-9][0-9]|(3)[6-9][0-9][0-9]|(4)[0-8][0-9][0-9]|(5)[0-4][0-9][0-9]|(5)[6-7][0-9][0-9])\Z/ } },
        states: []
    },
    {
        country: { value: 29, abbreviation: "PL", name: "Poland", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /\A(\d{2,2}(-)\d{3,3})\Z/ } },
        states: []
    },
    {
        country: { value: 30, abbreviation: "UK", name: "United Kingdom", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/ } },
        states: []
    },
    {
        country: { value: 31, abbreviation: "MX", name: "Mexico", text: { state: "State", zip: "Zip Code" }, validation: { zip: /\A\d{5,5}\Z/ } },
        states: []
    },
    {
        country: { value: 32, abbreviation: "AU", name: "Australia", text: { state: "State", zip: "Postal Code" }, validation: { zip: /^[0-9]{4}$/ } },
        states: [{ value: "NSW", name: "New South Wales" }, { value: "ACT", name: "Australian Capital Territory" }, { value: "VIC", name: "Victoria" }, { value: "QLD", name: "Queensland" }, { value: "SA", name: "South Australia" }, { value: "WA", name: "Western Australia" }, { value: "TAS", name: "Tasmania" }, { value: "NT", name: "Northern Territory" }]
    },
    {
        country: { value: 33, abbreviation: "NZ", name: "New Zealand", text: { state: "Province", zip: "Postal Code" }, validation: { zip: /^[0-9]{4}$/ } },
        states: []
    },
];
