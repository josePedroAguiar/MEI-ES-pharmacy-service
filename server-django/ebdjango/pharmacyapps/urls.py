from django.urls import path
from .views import MedView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('medicamentos', MedView, 'medicamentos')

 

urlpatterns = router.urls