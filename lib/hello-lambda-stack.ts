import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'

export class HelloLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const hello = new lambda.Function(this , 'HelloLambda' , {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('lambda'),
      handler:'hello.handler'
    })
    const api =  new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello,
      proxy: false
    });

    const api2 =  new apigw.LambdaRestApi(this, "SecondEndpoint", {
      handler: hello,
      proxy: false
    });

    const item = api.root.addResource('card')
    item.addMethod('GET')

    const item2 = api2.root.addResource('truck')
    item2.addMethod('GET')
  }
}
