from django.urls import path
from .views import loginView, joinView
  
urlpatterns = [
    path('login', loginView.as_view()),
    path('join', joinView.as_view()),
]