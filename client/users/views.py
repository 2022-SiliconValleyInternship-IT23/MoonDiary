from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import User
# Create your views here.

class joinView(View):
    # def get(self,request):
    #     return JsonResponse({'message': "요청 전송"}, status=200)
    def post(self,request):
        data = json.loads(request.body)
        id = data['userId'].replace('"','')
        pw = data['password'].replace('"','')
        name = data['name'].replace('"','')
        
        try:
            #이미 등록된 아이디
            if User.objects.filter(userId = id).exists():
                return HttpResponse(status=409)
            User.objects.create(
                userId = id,
                name = name,
                password = pw,
                imageYN = 1,
                commentYN = 1
            )
            HttpResponse(status=201)
        except KeyError:
            return JsonResponse({"message":"INVALID_KEYS"}, status=400)

class loginView(View):
    def post(self, request):
        data = json.loads(request.body)
        id = data['userId'].replace('"','')
        pw = data['password'].replace('"','')
        
        if User.objects.filter(userId = id).exists():
            user = User.objects.get(userId = id)
            if user.password == pw:
                HttpResponse(status=200)
            else :
                return JsonResponse({'message':'잘못된 비밀번호입니다'},status = 401)

        return JsonResponse({'message':'등록되지 않은 아이디입니다'},status=400)