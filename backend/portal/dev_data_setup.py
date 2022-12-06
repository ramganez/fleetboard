import csv

from django.conf import settings

from portal.models import Provider, Product, Transaction


PROVIDER_COL = ["merchant_network_id", "name","email", "website_url", "description", "logo","metro_area",
    "country", "setup_instructions", "provider_support", "merchant_category",
]

PRODUCT_COL = ["name", "mode_type", "pricing_type", "pricing_unit", "pricing_amount", "product_image", "product_description",
    "metro_area", "transaction_name", "discount_amount", "discount_description",
]

TXN_COL = [ "created_at", "status", "total_amount", "discount_amount", "discount_percentage", "merchant_network_id", "name", "transaction_name"]


def save_provider_product_data():
    """
    Read provider data from CSV and insert it into the Data model
    """
    with open(
        str(settings.BASE_DIR)
        + "/portal/dev_data/Fleet_Provider_Portal_Product_Data.csv",
        "r",
    ) as fp:
        prod_details = csv.DictReader(fp, delimiter=",")
        for row in prod_details:
            
            # create provider objs
            prov_data = {k: v for k, v in row.items() if k in PROVIDER_COL}
            try:
                provider_obj = Provider.objects.get(
                    merchant_network_id=prov_data["merchant_network_id"]
                )
            except Provider.DoesNotExist:
                provider_obj = None
            
            if not provider_obj:
                provider_obj = Provider.objects.create(**prov_data)
            
            # create product objs
            prod_data = {k: v for k, v in row.items() if k in PRODUCT_COL}
            prod_data['provider'] = provider_obj
            try:
                product_obj = Product.objects.get(**prod_data)
            except Product.DoesNotExist:
                product_obj = None
            if not product_obj:
                try:
                    product_obj = Product.objects.create(**prod_data)
                except Exception as e:
                    print(e)
                    print(prod_data)

        fp.close()

def save_txn_data():
    """
    Read TXN data from CSV and insert it into the Data model
    """
    with open(
        str(settings.BASE_DIR)
        + "/portal/dev_data/Fleet_Provider_Portal_TXN_Data.csv",
        "r",
    ) as fp:
        txn_details = csv.DictReader(fp, delimiter=",")
        for row in txn_details:
            
            # create txn objs
            txn_data = {k: v for k, v in row.items() if k in TXN_COL}
            print(txn_data)
            txn_data['provider'] = Provider.objects.get(merchant_network_id=txn_data['merchant_network_id'])
            txn_data['product'] = Product.objects.get(transaction_name=txn_data['transaction_name'])
            del txn_data['merchant_network_id']
            del txn_data['name']
            del txn_data['transaction_name']
            try:
                txn_obj = Transaction.objects.get(**txn_data)
            except Transaction.DoesNotExist:
                txn_obj = None
            
            if not txn_obj:
                try:
                    txn_obj = Transaction.objects.create(**txn_data)
                except Exception as e:
                    print(e)
                    print(txn_data)
            
        fp.close()

Provider.objects.all().delete()

save_provider_product_data()
save_txn_data()
