from rest_framework import serializers
from pharmacyapps.models import medicamentos
#from pharm.models import receitas


class MedSerializer(serializers.ModelSerializer):
    class Meta: 
        model = medicamentos
        fields = '__all__'

