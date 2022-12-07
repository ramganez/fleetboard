# to update the response data with chart data
from django.db.models import Count
from django.db.models.functions import TruncMonth

from portal.models import Transaction


def get_chart_data(provider):
    """Get chart data for the provider"""
    transaction_per_month = (
        Transaction.objects.filter(provider__id=provider.id)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(transactions=Count("id"))
    )
    month_and_count = [
        (e["month"].month, e["transactions"]) for e in transaction_per_month
    ]

    if month_and_count:
        l_fill = [0]*(month_and_count[0][0] - 1)
        r_fill = [0]*(month_and_count[-1][0])
        data = l_fill + [i[1] for i in month_and_count] + r_fill
        return data
    return []
