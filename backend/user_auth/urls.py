from django.urls import path
from .views import *

urlpatterns = [
    path('google/', GoogleLoginView.as_view(), name='google-login'),
    path('logout/', LogoutView.as_view(), name='logout'),

]
