from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView,RekoView

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/user/', UserView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/payment/', RekoView.as_view()),

]

