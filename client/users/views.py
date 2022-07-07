from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import User
# Create your views here.

class joinView(View):
    def get(self,request):
        return JsonResponse({'message': 'get success'}, status=200)
    def post(self,request):
        data = json.loads(request.body)
        try:
            #이미 등록된 아이디
            if User.objects.filter(userId = data['userId']).exists():
                return JsonResponse({'message': '이미 사용중인 아이디입니다'}, status=400)
            User.objects.create(
                userId = data['userId'],
                name = data['name'],
                password = data['password']
            )
            return JsonResponse({'message': '회원가입에 성공하였습니다'}, status=200)
        except KeyError:
            return JsonResponse({"message":"INVALID_KEYS"}, status=400)

class loginView(View):
    def post(self, request):
        data = json.loads(request.body)
        
        if User.objects.filter(userId = data['userId']).exists():
            user = User.objects.get(userId = data['userId'])
            if user.password == data['password']:
                return JsonResponse({'message': '{user.name}님 로그인 되셨습니다.'}, status=200)
            else :
                return JsonResponse({'message':'잘못된 비밀번호입니다'},status = 401)

        return JsonResponse({'message':'등록되지 않은 아이디입니다'},status=400)