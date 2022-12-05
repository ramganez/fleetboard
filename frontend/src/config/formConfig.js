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
  },
  PRODUCT: {
  }
}

export const FIELDS = Object.assign({}, fields);
