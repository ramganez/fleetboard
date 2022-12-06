const fields = {
  PROFILE: {
    name: {
      name: 'name',
      value: '',
      displayName: 'Name',
      type: 'text',
      required: true,
      maxlength: 100,
      autoFocus: false,
      placeholder: '',
      regex: '', // TODO
      msg: {
        required: 'Please enter name.',
        regex: 'Please enter a valid name.'
      },
    },
    email: {
      name: 'email',
      value: '',
      displayName: 'Email Address',
      type: 'text',
      required: true,
      autoFocus: false,
      placeholder: 'your-email@domain.com',
      regex: '', // TODO
      msg: {
        required: 'Please enter a valid email address.',
        regex: 'Please enter a valid email address.',
      },
    },
    website_url: {
      name: 'website_url',
      value: '',
      displayName: 'Website URL',
      type: 'text',
      required: true,
      autoFocus: false,
      placeholder: '',
      regex: '', // TODO
      msg: {
        required: 'Please enter website URL.',
        regex: 'Please enter a valid website URL.',
      },
    },
    description: {
      name: 'description',
      dataRequired: true,
      value: '',
      displayName: 'Description',
      type: 'text',
      required: true,
      maxlength: 300,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a description.',
        regex: 'Please enter a valid description.'
      }
    },
    logo: {
      name: 'logo',
      type: 'text',
      required: false,
      msg: {
      },
    },
    metro_area: {
      name: 'metro_area',
      value: '',
      displayName: 'Metro Area',
      type: 'text',
      required: true,
      maxlength: 100,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a description.',
        regex: 'Please enter a valid description.'
      }
    },
    country: {
      name: 'country',
      value: '',
      displayName: 'Country',
      type: 'text',
      required: true,
      maxlength: 50,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a Country.',
        regex: 'Please enter a valid Country.'
      }
    },
    setup_instructions: {
      name: 'setup_instructions',
      value: '',
      displayName: 'Setup Instructions',
      type: 'text',
      required: true,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a Setup Instructions URL.',
        regex: 'Please enter a valid Setup Instructions URL.'
      }
    },
    provider_support: {
      name: 'provider_support',
      value: '',
      displayName: 'Support Link',
      type: 'text',
      required: true,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a Support URL.',
        regex: 'Please enter a valid Support URL.'
      }
    },
    merchant_category: {
      name: 'merchant_category',
      value: '',
      displayName: 'Merchant Category',
      type: 'text',
      required: true,
      autoFocus: false,
      regex: '', // TODO
      msg: {
        required: 'Please enter a Merchant Category.',
        regex: 'Please enter a valid Merchant Category.'
      }
    },
    merchant_network_id: {
      name: 'merchant_network_id',
      value: '',
      displayName: 'Merchant Network Id',
      type: 'text',
      required: true,
      autoFocus: false,
      disabled: true,
      placeholder: 'your-email@domain.com',
      regex: '', // TODO
      msg: {
        required: 'Please enter a valid email address.',
        regex: 'Please enter a valid email address.',
      },
    },    
  },
  PRODUCT: {
    name: {
      name:'name',
      value: '',
      displayName: 'Name',
      type: 'text',
      required: true,
    }, 
    mode_type: {
      name:'mode_type',
      value: '',
      displayName: 'Mode Type',
      type: 'text',
      required: true,
    }, 
    pricing_type: {
      name:'pricing_type',
      value: '',
      displayName: 'Pricing Type',
      type: 'text',
      required: true,
    }, 
    pricing_unit: {
      name:'pricing_unit',
      value: '',
      displayName: 'pricing_unit',
      type: 'text',
      required: true,
    }, 
    pricing_amount: {
      name:'pricing_amount',
      value: '',
      displayName: 'Pricing Amount',
      type: 'text',
      required: true,
    }, 
    product_image: {
      name:'product_image',
      value: '',
      displayName: 'Product Image',
      type: 'text',
      required: false,
    }, 
    product_description: {
      name:'product_description',
      value: '',
      displayName: 'Product Description',
      type: 'text',
      required: true,
    }, 
    metro_area: {
      name:'metro_area',
      value: '',
      displayName: 'Metro Area',
      type: 'text',
      required: true,
    }, 
    transaction_name: {
      name:'transaction_name',
      value: '',
      displayName: 'Transaction Name',
      type: 'text',
      required: true,
    }, 
    discount_amount: {
      name:'discount_amount',
      value: '',
      displayName: 'Discount Amount',
      type: 'text',
      required: true,
    }, 
    discount_description: {
      name:'discount_description',
      value: '',
      displayName: 'Discount Description',
      type: 'text',
      required: true,
    }
  }
}

export const FIELDS = Object.assign({}, fields);
