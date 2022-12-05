const INSTANCE_TYPE = {
    PROFILE: [
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
    ],
    PRODUCT: [
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
        'provider',
    ]
}

export const transformResponse = (data) => {
    // including only needed information from response data
    const includeOnly = INSTANCE_TYPE[data.type];
    let responseData = {}
    for (let k in data) {
        if (!(includeOnly.indexOf(k) < 0)) {
            responseData[k] = data[k]
        }
    }

    return responseData;
}
