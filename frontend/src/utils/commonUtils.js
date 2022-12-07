const INSTANCE_TYPE = {
    PROFILE: [
        'id',
        'name',
        'email',
        'website_url',
        'description',
        // 'logo',
        'metro_area',
        'country',
        'setup_instructions',
        'provider_support',
        'merchant_category',
        'merchant_network_id',
    ],
    PRODUCT: [
        'id',
        'name',
        'mode_type',
        'pricing_type',
        'pricing_unit',
        'pricing_amount',
        'product_image',
        'product_description',
        'metro_area',
        'transaction_name',
        'discount_amount',
        'discount_description',
    ]
}

export const transformResponse = (data) => {
    // including only needed information from response data
    if (data.type !== undefined) {
        const includeOnly = INSTANCE_TYPE[data.type];
        let responseData = {}
        for (let k in data) {
            if (!(includeOnly.indexOf(k) < 0)) {
                responseData[k] = data[k]
            }
        }
        return responseData;
    }

    return data
}

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'flag') {
        console.log(a[orderBy], b[orderBy]);
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) => {
    if (order === 'desc') {
        return (a, b) => descendingComparator(a, b, orderBy)
    } else {
        return (a, b) => -descendingComparator(a, b, orderBy);
    }
}
